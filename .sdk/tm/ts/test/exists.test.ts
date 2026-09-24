
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { StitchAiDesignSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = StitchAiDesignSDK.test()
    equal(testsdk instanceof StitchAiDesignSDK, true,
      'StitchAiDesignSDK.test() must return a client synchronously')
  })

})
