import { Node } from '../Base.js'

type BlockNode<T extends Node> = T[]

const CreateBlockNode = <T extends Node>(block: T[]): BlockNode<T> => (block as BlockNode<T>) 

export { BlockNode as Base, CreateBlockNode as Create }