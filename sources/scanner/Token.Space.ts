import * as Scanner from "#root/DSLF.Scanner/Scanner"
import * as Commons from "#root/DSLF.Commons/Main"
import * as Utilities from "./utilities/Main.js"

class SpaceHandler implements Scanner.Handler
{
  public Execute(cursor: Scanner.Commons.Cursor, container: Scanner.Token.Base[]): void 
  {
    const accumulator = Scanner.Commons.CreateRegularExpressionAccumulator(/\s/)
    const queue: Commons.Queue.Base = new Commons.Queue.Base([])

    queue.Add(Utilities.Queue.Accumulate(cursor, accumulator))
    queue.Add(function(queue, data) {})

    queue.Start(new Map())
  }
}

export { SpaceHandler as Space }