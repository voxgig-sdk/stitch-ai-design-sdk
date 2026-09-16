# StitchAiDesign SDK feature factory

from stitchaidesign_sdk.feature.base_feature import StitchAiDesignBaseFeature
from stitchaidesign_sdk.feature.ratelimit_feature import StitchAiDesignRatelimitFeature
from stitchaidesign_sdk.feature.retry_feature import StitchAiDesignRetryFeature
from stitchaidesign_sdk.feature.test_feature import StitchAiDesignTestFeature
from stitchaidesign_sdk.feature.timeout_feature import StitchAiDesignTimeoutFeature


_FEATURES = {
    "base": lambda: StitchAiDesignBaseFeature(),
    "ratelimit": lambda: StitchAiDesignRatelimitFeature(),
    "retry": lambda: StitchAiDesignRetryFeature(),
    "test": lambda: StitchAiDesignTestFeature(),
    "timeout": lambda: StitchAiDesignTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
