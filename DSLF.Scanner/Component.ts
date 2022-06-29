import * as Token from './Token/Main.js'
import * as Types from './Types.js'

import { Context } from './Context.js'

export interface Component
{
  Scan(context: Context, cursor: Types.Cursor): Token.Base | void
}