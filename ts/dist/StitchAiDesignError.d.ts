import { Context } from './Context';
declare class StitchAiDesignError extends Error {
    isStitchAiDesignError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { StitchAiDesignError };
