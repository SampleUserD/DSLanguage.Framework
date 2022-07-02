import * as Nodes from './Nodes/Main.js'
import * as Components from './Component.js'
import * as Box from './Utility/Box.js'
import * as Layers from './Layers/Main.js'

import Component = Components.Base
import PossiblyTerminal = Nodes.Categories.Terminal

export class Environment<T extends Nodes.Base> extends Layers.WithReferenceToTop<PossiblyTerminal<T>> 
{
  public constructor(private _wrappedComponents: Box.Base<Component<T>>[]) 
  {
    super()
  }

  public override Parse(): PossiblyTerminal<T>
  {
    for (let wrappedComponent of this._wrappedComponents)
    {
      const result = Box.Unwrap(wrappedComponent).Parse(this)

      if (result !== undefined)
      {
        return result
      }
    }
  }
}