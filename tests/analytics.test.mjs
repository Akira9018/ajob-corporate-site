import { test } from 'node:test'
import assert from 'node:assert/strict'
import { trackEvent } from '../src/analytics.ts'

test('sends the event through gtag when it is available', () => {
 const calls = []
 const host = { gtag: (...args) => calls.push(args) }
 assert.equal(trackEvent('contact_submit', { inquiry_type: 'AI顧問について' }, host), true)
 assert.deepEqual(calls, [['event', 'contact_submit', { inquiry_type: 'AI顧問について' }]])
})
test('does nothing when gtag is not loaded', () => {
 assert.equal(trackEvent('contact_submit', {}, {}), false)
})
test('never throws when gtag itself fails', () => {
 assert.equal(trackEvent('contact_submit', {}, { gtag: () => { throw new Error('blocked') } }), false)
})
