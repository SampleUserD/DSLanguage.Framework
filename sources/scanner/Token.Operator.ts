import * as Scanner from "#root/DSLF.Scanner/Main"
import * as Commons from "#root/DSLF.Commons/Main"
import * as Utilities from "./utilities/Main.js"

const ARITHMETIC: string[] = [ '+', '-', '*', '/', '%' ]
const BOOLEAN: string[] = [ '<', '>', '==', '!', '?' ]
const BLOCK: string[] = [ ':', '(', ')', '{', '}', '[', ']' ]
const SELECTOR: string[] = [ '~', '.' ]
const ENUMERATION: string[] = [ ',', ';', '=' ]

const RESULTATIVE: string[] = [ ...ARITHMETIC, ...BOOLEAN, ...SELECTOR ]
const OPERATORS: string[] = [ ...RESULTATIVE, ...BLOCK, ...ENUMERATION ].sort((x, y) => y.length - x.length)

const MAX_LENGTH: number = OPERATORS[0].length 

class OperatorHandler implements Scanner.Handler
{
  public Execute(cursor: Scanner.Commons.Cursor, container: Scanner.Token.Base[]): void 
  {
    const accumulator = new Commons.Accumulator<string>((item, result) => 
    {
      return OPERATORS.includes(result.join(Commons.Constants.EMPTY_STRING) + item) == true
    }) 
    const queue: Commons.Queue.Base = new Commons.Queue.Base([])

    queue.Add(Utilities.Queue.Accumulate(cursor, accumulator))
    queue.Add(function(queue, data) 
    {
      const result: Scanner.Token.Value = data.get('.result') as Scanner.Token.Value;
      const length: number = Math.min(MAX_LENGTH, result.length)

      if (OPERATORS.includes(result) == true)
      {
        container.push(Scanner.Token.Create(Scanner.Token.Types.Basic.Operator, result))
        return undefined
      }
    })

    queue.Start(new Map())
  }
}

export { OperatorHandler as Operator }