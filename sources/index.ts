import * as MinecraftScanner from './scanner/Main.js'
import * as Commons from '#root/DSLF.Commons/Main'
import * as Parser from '#parser/Main'

import Nodes = Parser.Nodes
import Component = Parser.Components
import Context = Parser.Nodes.Additional.Context

// @begin[assign parser nodes]

type StringLike = Nodes.Executable<string>
type Arithmetic = Nodes.Executable<number>
type Conditional = Nodes.Executable<boolean>

type Value = Arithmetic | Conditional | StringLike | Nodes.Executable<void>

class Integer implements Arithmetic
{
  public constructor(private _value: number) {}

  public Execute(): number 
  {
    return this._value as number  
  }
}

class String implements StringLike
{
  public constructor(private _value: string) {}

  public Execute(): string 
  {
    return this._value as string  
  }
}

class Equality implements Conditional
{
  public constructor(private _left: Value, private _right: Value) {}

  public Execute(context: Context): boolean 
  {
    return this._left.Execute(context) == this._right.Execute(context)  
  }
}

class Conjuction implements Conditional
{
  public constructor(private _left: Conditional, private _right: Conditional) {}

  public Execute(context: Context): boolean 
  {
    return this._left.Execute(context) && this._right.Execute(context)  
  }
}

class Disjuction implements Conditional
{
  public constructor(private _left: Conditional, private _right: Conditional) {}

  public Execute(context: Context): boolean 
  {
    return this._left.Execute(context) || this._right.Execute(context)  
  }
}

class Multiplication implements Arithmetic
{
  public constructor(private _left: Arithmetic, private _right: Arithmetic) {}

  public Execute(context: Context): number 
  {
    return this._left.Execute(context) * this._right.Execute(context)
  }
}

class Addition implements Arithmetic
{
  public constructor(private _left: Arithmetic, private _right: Arithmetic) {}

  public Execute(context: Context): number 
  {
    return this._left.Execute(context) + this._right.Execute(context)
  }
}

// @end[assign parser nodes]
// @begin[assign parser components]

class IntegerParser implements Component.Base<Arithmetic>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<Arithmetic>): void | Arithmetic 
  {
    if (this._cursor.Current().type == Parser.Types.TokenTypes.Number)
    {
      const number: string = this._cursor.Current().value

      this._cursor.Next()

      return new Integer(parseFloat(number))
    }
  }
}

class StringParser implements Component.Base<StringLike>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<StringLike>): void | StringLike 
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

class EquationParser implements Component.Base<Value>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<Value>): Value
  {
    let result: Value = environment.ExecuteSuccessorParser() as Value

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == '==')
      {
        this._cursor.Next()

        result = new Equality(result, environment.ExecuteSuccessorParser() as Value)

        continue
      }

      break
    }

    return result
  }
}

class ConjuctionParser implements Component.Base<Conditional>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<Conditional>): Conditional
  {
    let result: Conditional = environment.ExecuteSuccessorParser() as Conditional

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == 'and')
      {
        this._cursor.Next()

        result = new Conjuction(result, environment.ExecuteSuccessorParser() as Conditional)

        continue
      }

      break
    }

    return result
  }
}

class DisjuctionParser implements Component.Base<Conditional>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(environment: Parser.Environment<Conditional>): Conditional
  {
    let result: Conditional = environment.ExecuteSuccessorParser() as Conditional

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == 'or')
      {
        this._cursor.Next()

        result = new Disjuction(result, environment.ExecuteSuccessorParser() as Conditional)

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

class EmptyContext implements Context {}

// @end[assign parser components]

// [USE CASE]

const tokens = MinecraftScanner.Create('1 == 1 or "hello" == "hello!"').Scan()

const cursor: Parser.Types.Cursor = new Commons.Cursor(tokens) // lifetime is unexpected
const parser: Parser.Base<Value> = new Parser.Base(cursor)

parser.Use(0, () => new IntegerParser(cursor))
parser.Use(0, () => new StringParser(cursor))

parser.Use(1, () => new MultiplicationParser(cursor))
parser.Use(2, () => new AdditionParser(cursor))

parser.Use(3, () => new EquationParser(cursor))

parser.Use(4, () => new DisjuctionParser(cursor))
parser.Use(4, () => new ConjuctionParser(cursor))

const ast: Nodes.Executable<any>[] = parser.Parse()
const context: Context = new EmptyContext()

ast.forEach(node => console.log(node.Execute(context)))