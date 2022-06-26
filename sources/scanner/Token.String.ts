import * as Scanner from "#root/DSLF.Scanner/Scanner"
import * as Commons from "#root/DSLF.Commons/Main"
import * as Utilities from "./utilities/Main.js"

class StringHandler implements Scanner.Handler
{
  public constructor(private _open: string, private _close: string) {}

  public Execute(cursor: Scanner.Commons.Cursor, container: Scanner.Token.Base[]): void 
  {
    // schema <">(. except of <\n> as result)<">
    const accumulator: Scanner.Commons.Accumulator = Scanner.Commons.CreateRegularExpressionAccumulator(/[^"]/)
    const queue: Commons.Queue.Base = new Commons.Queue.Base([])

    queue.Add(Utilities.Queue.Match(cursor, this._open))
    queue.Add(Utilities.Queue.Accumulate(cursor, accumulator))
    queue.Add(function(queue, data) 
    {
      container.push(Scanner.Token.Create(Scanner.Token.Types.Basic.String, data.get('.result') as string))
      queue.Next(data)
    })
    queue.Add(Utilities.Queue.Match(cursor, this._close))

    queue.Start(new Map())
  }
}

export { StringHandler as String }