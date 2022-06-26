import * as Scanner from "#root/DSLF.Scanner/Scanner"
import * as Commons from "#root/DSLF.Commons/Main"
import * as Utilities from "./utilities/Main.js"

class InfiniteRecursionBehaviour implements Scanner.Handler
{
  public constructor(private _limit: number = 50) {}

  private _position: number = 0;
  private _counter: number = 0;

  private Update(cursor: Scanner.Commons.Cursor): void 
  {
    if (++this._counter >= this._limit)
    {
      this._position = cursor.Position;
      this._counter = 0;
    }
  }

  private Exit(cursor: Scanner.Commons.Cursor): void 
  {
    if (this._position == cursor.Position && this._counter > 0)
    {
      throw new Error(`Unknown character '${ cursor.Current() }' at ${ cursor.Position }`)
    }
  }

  public Execute(cursor: Scanner.Commons.Cursor): void 
  {
    this.Update(cursor)
    this.Exit(cursor)
  }
}

export { InfiniteRecursionBehaviour as InfiniteRecursion }