import { Node } from './Base.js'

interface TranslatableNode extends Node
{ 
  Translate(): string
}

export { TranslatableNode }