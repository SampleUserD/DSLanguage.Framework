import * as Commons from "#commons/Main"
import * as Token from "./Token/Main.js"
import * as Types from "./Types.js"
import * as Factory from "./HandlerFactory.js"

import { Handler } from "./Handler.js"

class Scanner
{
  private _handlers: Factory.Base[] = []

  public AddHandler(handlerFactory: Handler): void
  {
    this._handlers.push(Factory.Create(handlerFactory))
  }

  public Scan(input: string): Token.Base[]
  {
    const tokens: Token.Base[] = []
    const cursor: Types.Cursor = new Commons.Cursor(input.split(Commons.Constants.EMPTY_STRING))

    while (cursor.Done == false)
    {
      this._handlers.forEach(handler => handler().Execute(cursor, tokens))
    }

    return tokens
  } 
}

export { Handler, Token, Types as Commons, Scanner as Base }