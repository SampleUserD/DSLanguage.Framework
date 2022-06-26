type Priority = number

function Validate(priority: Priority): boolean
{
  return priority >= 0
}

function AssertValidation(priority: Priority): void 
{
  if (Validate(priority) == false)
  {
    throw new Error(`Priority can not be less than zero`)
  }
}

function Default(): Priority
{
  return 0 as Priority
}

export { Priority as Base, Validate, AssertValidation, Default }