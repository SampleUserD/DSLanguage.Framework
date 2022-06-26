import * as MinecraftScanner from './scanner/Main.js'
import * as Commons from '#commons/Main'
import * as Parser from '#parser/Main'

import Nodes = Parser.Nodes
import Component = Parser.Component

// @begin[assign parser nodes]

type Arithmetic = Nodes.Executable<number>
type Conditional = Nodes.Executable<boolean>

class Integer implements Arithmetic
{
  public constructor(private _value: number) {}

  public Execute(): number 
  {
    return this._value as number  
  }
}

class String implements Nodes.Executable<string>
{
  public constructor(private _value: string) {}

  public Execute(): string 
  {
    return this._value as string  
  }
}

class Equality<T> implements Conditional
{
  public constructor(private _left: Nodes.Executable<T>, private _right: Nodes.Executable<T>) {}

  public Execute(): boolean 
  {
    return this._left.Execute() == this._right.Execute()  
  }
}

class Multiplication implements Arithmetic
{
  public constructor(private _left: Arithmetic, private _right: Arithmetic) {}

  public Execute(): number 
  {
    return this._left.Execute() * this._right.Execute()
  }
}

class Addition implements Arithmetic
{
  public constructor(private _left: Arithmetic, private _right: Arithmetic) {}

  public Execute(): number 
  {
    return this._left.Execute() + this._right.Execute()
  }
}

// @end[assign parser nodes]
// @begin[assign parser components]

class IntegerParser implements Component.Base<Arithmetic>
{
  public Parse(environment: Parser.Environment<Arithmetic>, toolkit: Parser.Toolkit): void | Arithmetic 
  {
    if (toolkit.Cursor.Current().type == Parser.Types.TokenTypes.Number)
    {
      const number: string = toolkit.Cursor.Current().value

      toolkit.Cursor.Next()

      return new Integer(parseFloat(number))
    }
  }
}

class StringParser implements Component.Base<Nodes.Executable<string>>
{
  public Parse(environment: Parser.Environment<Nodes.Executable<string>>, toolkit: Parser.Toolkit): void | Nodes.Executable<string> 
  {
    if (toolkit.Cursor.Current().type == Parser.Types.TokenTypes.String)
    {
      const string: string = toolkit.Cursor.Current().value

      toolkit.Cursor.Next()

      return new String(string)
    }
  }
}

class MultiplicationParser implements Component.Base<Arithmetic>
{
  public Parse(environment: Parser.Environment<Arithmetic>, toolkit: Parser.Toolkit): Arithmetic 
  {
    let result: Arithmetic = environment.ExecuteSuccessorParser() as Arithmetic

    while (toolkit.Cursor.Done == false)
    {
      if (toolkit.Cursor.Current().value == '*')
      {
        toolkit.Cursor.Next()

        result = new Multiplication(result, environment.ExecuteSuccessorParser() as Arithmetic)

        continue
      }

      break
    }

    return result
  }
}

class AdditionParser implements Component.Base<Arithmetic>
{
  public Parse(environment: Parser.Environment<Arithmetic>, toolkit: Parser.Toolkit): Arithmetic 
  {
    let result: Arithmetic = environment.ExecuteSuccessorParser() as Arithmetic

    while (toolkit.Cursor.Done == false)
    {
      if (toolkit.Cursor.Current().value == '+')
      {
        toolkit.Cursor.Next()

        result = new Addition(result, environment.ExecuteSuccessorParser() as Arithmetic)

        continue
      }

      break
    }

    return result
  }
}

// @end[assign parser components]

// [USE CASE]

const tokens = MinecraftScanner.Base.Scan('3 + 2 * 2 2 + 3 + 5')

const cursor: Parser.Types.Cursor = new Commons.Cursor(tokens)
const toolkit: Parser.Toolkit = new Parser.Toolkit(cursor)
const parser: Parser.Base<Nodes.Executable<any>> = new Parser.Base(cursor, toolkit)

parser.Use(0, new IntegerParser())
parser.Use(0, new StringParser())

parser.Use(1, new MultiplicationParser())
parser.Use(2, new AdditionParser())

const ast: Nodes.Executable<any>[] = parser.Parse()

ast.forEach(node => console.log(node.Execute()))
