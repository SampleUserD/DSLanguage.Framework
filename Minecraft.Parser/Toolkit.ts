import * as DefaultTypes from './Types.js'

// There are a lot dependencies
export class Toolkit 
{
  public constructor(private _cursor: DefaultTypes.Cursor) {}

  public get Cursor(): DefaultTypes.Cursor
  {
    return this._cursor
  }
}