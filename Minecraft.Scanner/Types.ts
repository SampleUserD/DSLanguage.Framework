import * as Commons from "#commons/Main"
import * as Token from "./Token/Main.js"

export type Cursor = Commons.Cursor<Token.Value>
export type Accumulator = Commons.Accumulator<Token.Value>

export const CreateRegularExpressionAccumulator = (expression: RegExp): Accumulator => 
  new Commons.Accumulator(item => expression.test(item))

export const CreateArrayAccumulator = (array: Token.Value[]): Accumulator => 
  new Commons.Accumulator(item => array.includes(item))