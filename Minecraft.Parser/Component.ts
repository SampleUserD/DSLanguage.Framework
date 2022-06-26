import { Environment } from './Environment.js'

import * as Nodes from './Nodes/Main.js'

interface Component<T extends Nodes.Base>
{
  Parse(environment: Environment<T>): T | void
}

export { Component as Base }