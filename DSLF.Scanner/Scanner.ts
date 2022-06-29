import * as Token from './Token/Main.js'
import * as Types from './Types.js'
import * as Box from './Utility/Box.js'

import { Context } from './Context.js'
import { Component } from './Component.js'

export class Scanner
{
  private _components: Box.Base<Component>[] = []

  public constructor(private _input: Types.Cursor) {}

  public Use(component: Box.Base<Component>): void 
  {
    this._components.push(component)
  }

  public Scan(context: Context): Token.Base[]
  {
    const tokens: Token.Base[] = []

    while (this._input.Done == false)
    {
      this._components.forEach(component => 
      {
        const result = Box.Unwrap(component).Scan(context, this._input)
        
        if (result !== undefined)
        {
          tokens.push(result as Token.Base)
        }
      })
    }

    return tokens
  } 
}