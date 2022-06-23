import * as Scanner from '#scanner/Scanner' 
import * as Commons from '#commons/Main'

import * as Nodes from './Node.js'
import * as Components from './Component.js'

export class __Parser__ 
{
  private _components: Components.Base[] = []

  public UseComponent(component: Components.Base): void 
  {
    this._components.push(component)
  }

  private ParseExpression(cursor: Commons.Cursor<Scanner.Token.Base>, tree: Nodes.Base[]): Nodes.Base
  {
    throw new Error(`Parse error: token(type=, value=) can not be parsed correctly`)
  }

  public Parse(tokens: Scanner.Token.Base[]): Nodes.Base[] 
  {
    const cursor: Commons.Cursor<Scanner.Token.Base> = new Commons.Cursor(tokens)
    const tree: Nodes.Base[] = []

    while (cursor.Done == false)
    {
      tree.push(this.ParseExpression(cursor, tree))     
    }

    return tree
  }
}