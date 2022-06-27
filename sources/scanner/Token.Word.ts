import * as Scanner from "#root/DSLF.Scanner/Main"
import * as Commons from "#root/DSLF.Commons/Main"
import * as Utilities from "./utilities/Main.js"

class WordHandler implements Scanner.Handler
{
  public Execute(cursor: Scanner.Commons.Cursor, container: Scanner.Token.Base[]): void 
  {
    const accumulator = Scanner.Commons.CreateRegularExpressionAccumulator(/[a-z_-]/i)
    const queue: Commons.Queue.Base = new Commons.Queue.Base([])

    queue.Add(Utilities.Queue.Accumulate(cursor, accumulator))
    queue.Add(function(queue, data) 
    {
      container.push(Scanner.Token.Create(Scanner.Token.Types.Basic.Word, data.get('.result') as string))
    })

    queue.Start(new Map())
  }
}

export { WordHandler as Word }