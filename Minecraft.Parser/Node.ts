interface Node 
{
  type: string
}

interface PrimitiveNode extends Node 
{
  value: string
}

interface BlockNode extends Node
{
  nodes: Node[]
}

export { Node as Base, PrimitiveNode as Primitive, BlockNode as Block }