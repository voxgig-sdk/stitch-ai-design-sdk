# ProjectName SDK exists test

import pytest
from stitchaidesign_sdk import StitchAiDesignSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = StitchAiDesignSDK.test(None, None)
        assert testsdk is not None
