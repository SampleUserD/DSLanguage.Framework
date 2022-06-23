import * as Commons from '#commons/Main'
import * as Scanner from '#scanner/Scanner'

export function Match(cursor: Scanner.Commons.Cursor, item: Scanner.Token.Value): Commons.Queue.Member 
{
  return (queue: Commons.Queue.Base, data: Commons.Queue.TransferData): void => 
  {
    if (cursor.Current() === item)
    {
      cursor.Next()
      queue.Next(data)
    }
  }
}