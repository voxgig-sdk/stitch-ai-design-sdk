package core

type StitchAiDesignError struct {
	IsStitchAiDesignError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewStitchAiDesignError(code string, msg string, ctx *Context) *StitchAiDesignError {
	return &StitchAiDesignError{
		IsStitchAiDesignError: true,
		Sdk:              "StitchAiDesign",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *StitchAiDesignError) Error() string {
	return e.Msg
}
