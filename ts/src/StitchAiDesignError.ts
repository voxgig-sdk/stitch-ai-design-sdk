
import { Context } from './Context'


class StitchAiDesignError extends Error {

  isStitchAiDesignError = true

  sdk = 'StitchAiDesign'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  StitchAiDesignError
}

