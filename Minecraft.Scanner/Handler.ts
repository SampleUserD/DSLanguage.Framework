import * as Types from "./Types.js"
import * as Token from "./Token/Main.js"

export interface Handler
{
  Execute(cursor: Types.Cursor, container: Token.Base[]): void
}