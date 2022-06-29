import { Type } from './Type.js';

export class BasicTypes
{
  public static readonly Word = new Type('word')
  public static readonly Number = new Type('number')
  public static readonly String = new Type('string')
  public static readonly Comment = new Type('comment')
  public static readonly Keyword = new Type('keyword')
  public static readonly Operator = new Type('operator')
  public static readonly Selector = new Type('selector')
}