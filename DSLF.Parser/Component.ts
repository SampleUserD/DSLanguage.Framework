import { Descendant } from './Descendant.js'

import * as Nodes from './Nodes/Main.js'

interface Component<T extends Nodes.Base>
{
  Parse(environment: Descendant<T | void>): T | void
}

export { Component as Base }