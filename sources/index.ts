import * as MinecraftScanner from './scanner/Main.js'
import * as Commons from '#root/DSLF.Commons/Main'
import * as Parser from '#parser/Main'

import Nodes = Parser.Nodes
import Component = Parser.Components

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
  private _count: number = 0

  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<Arithmetic>): void | Arithmetic 
  {
    console.log(++this._count)

    if (this._cursor.Current().type == Parser.Types.TokenTypes.Number)
    {
      const number: string = this._cursor.Current().value

      this._cursor.Next()

      return new Integer(parseFloat(number))
    }
  }
}

class StringParser implements Component.Base<Nodes.Executable<string>>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<Nodes.Executable<string>>): void | Nodes.Executable<string> 
  {
    if (this._cursor.Current().type == Parser.Types.TokenTypes.String)
    {
      const string: string = this._cursor.Current().value

      this._cursor.Next()

      return new String(string)
    }
  }
}

class MultiplicationParser implements Component.Base<Arithmetic>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<Arithmetic>): Arithmetic 
  {
    let result: Arithmetic = environment.ExecuteSuccessorParser() as Arithmetic

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == '*')
      {
        this._cursor.Next()

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
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<Arithmetic>): Arithmetic 
  {
    let result: Arithmetic = environment.ExecuteSuccessorParser() as Arithmetic

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == '+')
      {
        this._cursor.Next()

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

const tokens = MinecraftScanner.Base.Scan('1 1 1')

const cursor: Parser.Types.Cursor = new Commons.Cursor(tokens)
const parser: Parser.Base<Nodes.Executable<any>> = new Parser.Base(cursor)

parser.Use(0, () => new IntegerParser(cursor))
parser.Use(0, () => new StringParser(cursor))

parser.Use(1, () => new MultiplicationParser(cursor))
parser.Use(2, () => new AdditionParser(cursor))

const ast: Nodes.Executable<any>[] = parser.Parse()

// ast.forEach(node => console.log(node.Execute()))
