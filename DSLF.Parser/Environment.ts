import * as Nodes from './Nodes/Main.js'
import * as Components from './Component.js'
import * as Box from './Box.js'

import { Descendant } from './Descendant.js'

export class Environment<T extends Nodes.Base> extends Descendant<T | void> 
{
  public constructor(private _wrappedComponents: Box.Base<Components.Base<T>>[]) 
  {
    super()
  }

  public override Parse(): T | void
  {
    for (let wrappedComponent of this._wrappedComponents)
    {
      const result: T | void = Box.Unwrap<Components.Base<T>>(wrappedComponent).Parse(this)

      if (result !== undefined)
      {
        return result
      }
    }
  }
}