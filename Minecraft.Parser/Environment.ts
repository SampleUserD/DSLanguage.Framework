import * as Nodes from './Nodes/Main.js'
import * as Components from './Component.js'

import { Descendant } from './Descendant.js'

export class Environment<T extends Nodes.Base> extends Descendant<T | void> 
{
  public constructor(private _components: Components.Base<T>[]) 
  {
    super()
  }

  public override Parse(): T | void
  {
    for (let component of this._components)
    {
      const result: T | void = component.Parse(this)

      if (result !== undefined)
      {
        return result
      }
    }
  }
}