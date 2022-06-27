import * as Scanner from "#root/DSLF.Scanner/Main"
import * as Commons from "#root/DSLF.Commons/Main"
import * as Utilities from "./utilities/Main.js"

class MultilineCommentHandler implements Scanner.Handler
{
  public constructor(private _begin: string, private _end: string) {}

  public Execute(cursor: Scanner.Commons.Cursor, container: Scanner.Token.Base[]): void 
  {
    const accumulator: Scanner.Commons.Accumulator = new Commons.Accumulator(item => 
    {
      const word: Scanner.Token.Value[] = Utilities.Cursor.Get<Scanner.Token.Value>(cursor, this._end.length);
      return word.join(Commons.Constants.EMPTY_STRING) != this._end
    })

    const queue: Commons.Queue.Base = new Commons.Queue.Base([])

    queue.Add(Utilities.Queue.MatchWord(cursor,  Commons.Functions.TranslateStringToArray(this._begin)))
    queue.Add(Utilities.Queue.Accumulate(cursor, accumulator))
    queue.Add(function(queue, data)
    {
      container.push(Scanner.Token.Create(Scanner.Token.Types.Basic.Comment, data.get('.result') as string))
      queue.Next(data)
    })
    queue.Add(Utilities.Queue.MatchWord(cursor, Commons.Functions.TranslateStringToArray(this._end)))

    queue.Start(new Map())
  }
}

export { MultilineCommentHandler as MultilineComment }