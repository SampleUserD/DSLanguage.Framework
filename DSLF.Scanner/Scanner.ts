import * as Token from './Token/Main.js'
import * as Types from './Types.js'
import * as Box from './Utility/Box.js'

import { Context } from './Context.js'
import { Handler } from './Handler.js'

export class Scanner
{
  private _handlers: Box.Base<Handler>[] = []

  public constructor(private _input: Types.Cursor) {}

  public AddHandler(handlerFactory: Box.Base<Handler>): void
  {
    this._handlers.push(handlerFactory)
  }

  public Scan(): Token.Base[]
  {
    const tokens: Token.Base[] = []

    while (this._input.Done == false)
    {
      this._handlers.forEach(handler => handler().Execute(this._input, tokens))
    }

    return tokens
  } 
}