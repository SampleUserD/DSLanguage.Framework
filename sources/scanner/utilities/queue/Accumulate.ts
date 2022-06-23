import * as Commons from '#commons/Main'
import * as Scanner from '#scanner/Scanner'

/**
 * This function accumulates characters in string 
 * and rewrite data in section '.result' at queue
 * 
 * @param { Scanner.Commons.Cursor } cursor 
 * @param { Scanner.Commons.Accumulator } accumulator 
 * @returns { void }
 */
export function Accumulate(cursor: Scanner.Commons.Cursor, accumulator: Scanner.Commons.Accumulator): Commons.Queue.Member 
{
  return (queue: Commons.Queue.Base, data: Commons.Queue.TransferData): void => 
  {
    for (cursor; accumulator.Matches(cursor.Current()) && cursor.Done == false; cursor.Next())
    {
      accumulator.Accumulate(cursor.Current())
    }

    if (accumulator.Result.length != 0)
    {
      const result: string = accumulator.Result.join(Commons.Constants.EMPTY_STRING)
      queue.Next(Commons.Functions.TranslateObjectToMap<Scanner.Token.Value>({ '.result': result }))
    }
  }
}