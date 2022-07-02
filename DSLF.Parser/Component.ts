import * as Layers from './Layers/Main.js'
import * as Nodes from './Nodes/Main.js'

import Layer = Layers.Base
import PossiblyTerminal = Nodes.Categories.Terminal

interface Component<T extends Nodes.Base>
{
  Parse(layer: Layer<PossiblyTerminal<T>>): PossiblyTerminal<T>
}

export { 
  Component as Base 
}