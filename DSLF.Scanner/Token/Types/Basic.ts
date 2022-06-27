import { Type } from './Type.js';

export class BasicTypes
{
  static readonly Word = new Type('word')
  static readonly Number = new Type('number')
  static readonly String = new Type('string')
  static readonly Comment = new Type('comment')
  static readonly Operator = new Type('operator')
  static readonly Selector = new Type('selector')
}