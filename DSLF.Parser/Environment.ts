import * as Nodes from './Nodes/Main.js'
import * as Components from './Component.js'
import * as Box from './Utility/Box.js'
import * as Layers from './Layers/Main.js'

export class Environment<T extends Nodes.Base> extends Layers.WithReferenceToTop<T | void> 
{
  public constructor(private _wrappedComponents: Box.Base<Components.Base<T>>[]) 
  {
    super()
  }

  public override Parse(): T | void
  {
    for (let wrappedComponent of this._wrappedComponents)
    {
      const result: T | void = Box.Unwrap(wrappedComponent).Parse(this)

      if (result !== undefined)
      {
        return result
      }
    }
  }
}