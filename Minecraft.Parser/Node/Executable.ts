import { Node } from './Base.js'

interface ExecutableNode<T = void> extends Node
{ 
  Execute(): T
}

export { ExecutableNode }