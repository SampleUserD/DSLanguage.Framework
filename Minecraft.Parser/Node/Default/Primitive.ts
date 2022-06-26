import { Node } from '../Base.js'

interface PrimitiveNode extends Node 
{
  value: string
}

const CreatePrimitiveNode = (value: string): PrimitiveNode => ({ value } as PrimitiveNode) 

export { PrimitiveNode as Base, CreatePrimitiveNode as Create }

