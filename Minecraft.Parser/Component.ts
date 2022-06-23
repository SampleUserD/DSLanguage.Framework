import * as Nodes from './Node.js'
import * as Commons from './Types.js'

interface Component
{
  Parse(cursor: Commons.Cursor, tree: Commons.Token[]): Nodes.Base
}

export { Component as Base }