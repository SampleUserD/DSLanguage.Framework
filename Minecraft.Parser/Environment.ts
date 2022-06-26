import * as Nodes from './Node/Main.js'
import * as Components from './Component.js'

import { Descendant } from './Descendant.js'
import { Toolkit } from './Toolkit.js'

export class Environment<T extends Nodes.Base> extends Descendant<T | void> 
{
  public constructor(private _components: Components.Base<T>[], private _toolkit: Toolkit) 
  {
    super()
  }

  public override Parse(): T | void
  {
    for (let component of this._components)
    {
      const result: T | void = component.Parse(this, this._toolkit)

      if (result !== undefined)
      {
        return result
      }
    }
  }
}