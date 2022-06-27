export abstract class Descendant<T>
{
  private _successor: Descendant<T> | void = undefined

  public set Successor(environment: Descendant<T> | void) 
  {
    this._successor = environment
  }

  public ExecuteSuccessorParser(): T 
  {
    if (this._successor === undefined)
      throw new Error(`This layer has no successor`)

    return this._successor.Parse()
  }

  public abstract Parse(): T
}