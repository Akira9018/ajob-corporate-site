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
