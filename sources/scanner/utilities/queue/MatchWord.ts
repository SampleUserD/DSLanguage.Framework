import * as Commons from '#root/DSLF.Commons/Main'
import * as Scanner from '#scanner/Main'
import * as Cursor from '../cursor/Main.js'

export function MatchWord(cursor: Scanner.Commons.Cursor, items: Scanner.Token.Value[]): Commons.Queue.Member
{
  return (queue: Commons.Queue.Base, data: Commons.Queue.TransferData): void =>
  {
    const word: Scanner.Token.Value[] = Cursor.Get<Scanner.Token.Value>(cursor, items.length);

    if (Object.is(word.toString(), items.toString()) == true)
    {
      Cursor.Unsafe.By<Scanner.Token.Value>(cursor, items.length)
      queue.Next(data)
    }
  }
}