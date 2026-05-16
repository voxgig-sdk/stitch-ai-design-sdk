
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { StitchAiDesignSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await StitchAiDesignSDK.test()
    equal(null !== testsdk, true)
  })

})
