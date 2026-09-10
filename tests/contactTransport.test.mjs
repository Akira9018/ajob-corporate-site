import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sendContact, ContactDeliveryError, CONTACT_ENDPOINT } from '../src/contactTransport.ts'
const payload = {company:'検証専用', name:'テスト', email:'qa@example.invalid', type:'AI顧問について', message:'ローカルの模擬通信です。',consent:'agreed',_gotcha:''}
// All requests are injected mocks. This suite never contacts Formspree.
test('preserves the existing destination and accepts a successful response',async()=>{
 let calls=0
 await sendContact(payload,async(url,options)=>{
  calls++
  assert.equal(url,CONTACT_ENDPOINT)
  assert.equal(url,'https://formspree.io/f/mqalbgwy')
  assert.equal(options.method,'POST')
  assert.equal(options.headers.Accept,'application/json')
  assert.deepEqual(JSON.parse(options.body),{...payload,_subject:'【AJOB】お問い合わせ：AI顧問について'})
  return new Response('{}',{status:200})
 })
 assert.equal(calls,1)
})
test('non-2xx responses never report success',async()=>{
 for(const status of [400,422,429,500]) await assert.rejects(sendContact(payload,async()=>new Response('',{status})),e=>e instanceof ContactDeliveryError&&e.kind==='server')
})
test('network failures remain distinct from accepted submissions',async()=>{
 await assert.rejects(sendContact(payload,async()=>{throw new TypeError('offline')}),e=>e instanceof ContactDeliveryError&&e.kind==='network')
})
test('timeouts abort the request and retain an uncertain delivery result',async()=>{
 await assert.rejects(sendContact(payload,async(_url,options)=>new Promise((_resolve,reject)=>{options.signal.addEventListener('abort',()=>reject(new Error('aborted')))}),5),e=>e instanceof ContactDeliveryError&&e.kind==='timeout')
})
test('records the inquiry in the portal DB after the intake service accepts it',async()=>{
 const urls=[]
 const portal={url:'https://portal.example.invalid',key:'anon-key'}
 await sendContact(payload,async(url,options)=>{
  urls.push(url)
  if(url===CONTACT_ENDPOINT) return new Response('{}',{status:200})
  assert.equal(options.headers.apikey,'anon-key')
  const body=JSON.parse(options.body)
  assert.equal(body.p_site_slug,'ajob-hp')
  assert.equal(body.p_name,'テスト')
  assert.equal(body.p_contact,'qa@example.invalid')
  assert.match(body.p_message,/会社名: 検証専用/)
  assert.match(body.p_message,/ローカルの模擬通信です。/)
  return new Response('[]',{status:200})
 },20000,portal)
 assert.deepEqual(urls,[CONTACT_ENDPOINT,'https://portal.example.invalid/rest/v1/rpc/submit_inquiry'])
})
test('portal DB failures never turn an accepted submission into an error',async()=>{
 const portal={url:'https://portal.example.invalid',key:'anon-key'}
 await sendContact(payload,async(url)=>url===CONTACT_ENDPOINT?new Response('{}',{status:200}):new Response('',{status:500}),20000,portal)
 await sendContact(payload,async(url)=>{if(url===CONTACT_ENDPOINT) return new Response('{}',{status:200}); throw new TypeError('offline')},20000,portal)
})
test('skips the portal DB when it is not configured',async()=>{
 let calls=0
 await sendContact(payload,async()=>{calls++;return new Response('{}',{status:200})},20000,null)
 assert.equal(calls,1)
})
