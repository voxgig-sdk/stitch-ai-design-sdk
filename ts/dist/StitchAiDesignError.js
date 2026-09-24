"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StitchAiDesignError = void 0;
class StitchAiDesignError extends Error {
    isStitchAiDesignError = true;
    sdk = 'StitchAiDesign';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.StitchAiDesignError = StitchAiDesignError;
//# sourceMappingURL=StitchAiDesignError.js.map