import { Descendant } from './Descendant.js';

export abstract class DescendantWithReferenceToTop<T> extends Descendant<T>
{
  private _top: Descendant<T> | void = undefined

  public set Top(top: Descendant<T>) 
  {
    this._top = top
  }

  public ExecuteTopParser(): T 
  {
    if (this._top === undefined)
      throw new Error(`This layer has no reference to top`)

    return this._top.Parse()
  }
}