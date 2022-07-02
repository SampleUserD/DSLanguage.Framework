import * as Layers from './Layers/Main.js'
import * as Nodes from './Nodes/Main.js'

interface Component<T extends Nodes.Base>
{
  Parse(environment: Layers.Base<T | void>): T | void
}

export { 
  Component as Base 
}