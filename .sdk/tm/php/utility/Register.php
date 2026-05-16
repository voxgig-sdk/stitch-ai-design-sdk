<?php
declare(strict_types=1);

// StitchAiDesign SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

StitchAiDesignUtility::setRegistrar(function (StitchAiDesignUtility $u): void {
    $u->clean = [StitchAiDesignClean::class, 'call'];
    $u->done = [StitchAiDesignDone::class, 'call'];
    $u->make_error = [StitchAiDesignMakeError::class, 'call'];
    $u->feature_add = [StitchAiDesignFeatureAdd::class, 'call'];
    $u->feature_hook = [StitchAiDesignFeatureHook::class, 'call'];
    $u->feature_init = [StitchAiDesignFeatureInit::class, 'call'];
    $u->fetcher = [StitchAiDesignFetcher::class, 'call'];
    $u->make_fetch_def = [StitchAiDesignMakeFetchDef::class, 'call'];
    $u->make_context = [StitchAiDesignMakeContext::class, 'call'];
    $u->make_options = [StitchAiDesignMakeOptions::class, 'call'];
    $u->make_request = [StitchAiDesignMakeRequest::class, 'call'];
    $u->make_response = [StitchAiDesignMakeResponse::class, 'call'];
    $u->make_result = [StitchAiDesignMakeResult::class, 'call'];
    $u->make_point = [StitchAiDesignMakePoint::class, 'call'];
    $u->make_spec = [StitchAiDesignMakeSpec::class, 'call'];
    $u->make_url = [StitchAiDesignMakeUrl::class, 'call'];
    $u->param = [StitchAiDesignParam::class, 'call'];
    $u->prepare_auth = [StitchAiDesignPrepareAuth::class, 'call'];
    $u->prepare_body = [StitchAiDesignPrepareBody::class, 'call'];
    $u->prepare_headers = [StitchAiDesignPrepareHeaders::class, 'call'];
    $u->prepare_method = [StitchAiDesignPrepareMethod::class, 'call'];
    $u->prepare_params = [StitchAiDesignPrepareParams::class, 'call'];
    $u->prepare_path = [StitchAiDesignPreparePath::class, 'call'];
    $u->prepare_query = [StitchAiDesignPrepareQuery::class, 'call'];
    $u->result_basic = [StitchAiDesignResultBasic::class, 'call'];
    $u->result_body = [StitchAiDesignResultBody::class, 'call'];
    $u->result_headers = [StitchAiDesignResultHeaders::class, 'call'];
    $u->transform_request = [StitchAiDesignTransformRequest::class, 'call'];
    $u->transform_response = [StitchAiDesignTransformResponse::class, 'call'];
});
