import * as Commons from "#root/DSLF.Commons/Main"
import * as Scanner from "#scanner/Scanner"

import DefaultTokenTypes = Scanner.Token.Types.Basic

export { DefaultTokenTypes as TokenTypes }
export type TokenValue = Scanner.Token.Value
export type Token = Scanner.Token.Base

export type Cursor = Commons.Cursor<Token>
export type Accumulator = Commons.Accumulator<Token>