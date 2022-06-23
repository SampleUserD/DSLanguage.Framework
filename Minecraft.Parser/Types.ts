import * as Commons from "#commons/Main"
import * as Scanner from "#scanner/Scanner"

export type Token = Scanner.Token.Base
export type Cursor = Commons.Cursor<Scanner.Token.Base>
export type Accumulator = Commons.Accumulator<Scanner.Token.Base>