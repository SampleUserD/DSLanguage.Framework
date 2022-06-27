import * as Scanner from "#root/DSLF.Scanner/Main"
import * as Commons from "#root/DSLF.Commons/Main"
import * as Utilities from "./utilities/Main.js"

class CommentHandler implements Scanner.Handler
{
  // TOO MANY RESPONSOBILITIES!
  public Execute(cursor: Scanner.Commons.Cursor, container: Scanner.Token.Base[]): void 
  {
    const accumulator: Scanner.Commons.Accumulator = Scanner.Commons.CreateRegularExpressionAccumulator(/[^\n]/)
    const queue: Commons.Queue.Base = new Commons.Queue.Base([])

    queue.Add(Utilities.Queue.Match(cursor, `#`))
    queue.Add(Utilities.Queue.Accumulate(cursor, accumulator))
    queue.Add(function(queue, data)
    {
      container.push(Scanner.Token.Create(Scanner.Token.Types.Basic.Comment, data.get('.result') as string))
      queue.Next(data)
    })
    queue.Add(Utilities.Queue.Match(cursor, `\n`))

    queue.Start(new Map())
  }
}

export { CommentHandler as Comment }