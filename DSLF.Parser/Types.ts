import * as Commons from "../DSLF.Commons/Main.js"
import * as Scanner from "../DSLF.Scanner/Main.js"

import DefaultTokenTypes = Scanner.Token.Types.Basic

export { DefaultTokenTypes as TokenTypes }

export type TokenValue = Scanner.Token.Value
export type Token = Scanner.Token.Base

export type Cursor = Commons.Cursor<Token>
export type Accumulator = Commons.Accumulator<Token>