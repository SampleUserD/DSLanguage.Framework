type Box<T> = () => T

function Wrap<T>(object: T): Box<T> 
{
  return () => object
}

function Unwrap<T>(box: Box<T>): T 
{
  return box()
}

export { Box as Base, Wrap, Unwrap }