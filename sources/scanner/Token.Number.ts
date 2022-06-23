import * as Scanner from "#root/Minecraft.Scanner/Scanner"
import * as Commons from "#root/Minecraft.Commons/Main"
import * as Utilities from "./utilities/Main.js"

class NumberHandler implements Scanner.Handler
{
  public Execute(cursor: Scanner.Commons.Cursor, container: Scanner.Token.Base[]): void 
  {
    const accumulator = Scanner.Commons.CreateRegularExpressionAccumulator(/[0-9\.]/)
    const queue: Commons.Queue.Base = new Commons.Queue.Base([])

    queue.Add(Utilities.Queue.Accumulate(cursor, accumulator))
    queue.Add(function(queue, data) 
    {
      container.push(Scanner.Token.Create(Scanner.Token.Types.Basic.Number, data.get('.result') as string))
    })

    queue.Start(new Map())
  }
}

export { NumberHandler as Number }