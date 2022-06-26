import { Environment } from './Environment.js'
import { Toolkit } from './Toolkit.js'

import * as Nodes from './Node/Main.js'

interface Component<T extends Nodes.Base>
{
  Parse(environment: Environment<T>, toolkit: Toolkit): T | void
}

export { Component as Base }