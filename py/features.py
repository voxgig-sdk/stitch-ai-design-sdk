# StitchAiDesign SDK feature factory

from feature.base_feature import StitchAiDesignBaseFeature
from feature.test_feature import StitchAiDesignTestFeature


def _make_feature(name):
    features = {
        "base": lambda: StitchAiDesignBaseFeature(),
        "test": lambda: StitchAiDesignTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
