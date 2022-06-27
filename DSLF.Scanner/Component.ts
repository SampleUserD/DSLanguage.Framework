import * as Token from './Token/Main.js'

import { Context } from './Context.js'

export interface Component
{
  Scan(context: Context): Token.Base
}