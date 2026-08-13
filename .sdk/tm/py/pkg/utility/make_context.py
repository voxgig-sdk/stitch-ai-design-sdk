# StitchAiDesign SDK utility: make_context

from projectname_sdk.core.context import StitchAiDesignContext


def make_context_util(ctxmap, basectx):
    return StitchAiDesignContext(ctxmap, basectx)
