import * as Types from './Types.js'
import * as Token from './Token/Main.js'

/**
 * @deprecated
 * 
 * Do not use this interface for customizable handlers.
 * Better use `interface Component` (./Component.ts)
 */
export interface Handler
{
  Execute(cursor: Types.Cursor, container: Token.Base[]): void
}