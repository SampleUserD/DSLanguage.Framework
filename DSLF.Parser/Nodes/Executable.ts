import * as Additional from './Additional/Main.js'

import { Node } from './Base.js'

interface ExecutableNode<T = void> extends Node
{ 
  Execute(context: Additional.Context): T
}

export { ExecutableNode }