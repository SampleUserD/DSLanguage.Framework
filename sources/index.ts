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


class VariableContext implements Context
{
  private _variables: Map<string, Value> = new Map()

  public SetVariable(name: string, value: Value): void 
  {
    this._variables.set(name, value)
  }

  public GetVariable(name: string): Value 
  {
    return this._variables.get(name) as Value
  }
}

class VariableAddress implements Nodes.Executable<string | number | boolean>
{
  public constructor(private _name: string) {}

  public Execute(context: VariableContext): string | number | boolean 
  {
    return context.GetVariable(this._name).Execute(context) as (string | number | boolean)
  }
}

class VariableAssignation implements Nodes.Executable<string | number | boolean>
{
  public constructor(private _name: string, private _value: Value) {}

  public Execute(context: VariableContext): string | number | boolean 
  {
    context.SetVariable(this._name, this._value)

    return this._value.Execute(context) as string | number | boolean 
  }
}

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

class VariableAddressParser implements Component.Base<Value>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(): void | Value 
  {
    if (this._cursor.Current().value == '%')
    {
      this._cursor.Next()

      if (this._cursor.Current().type.Equals(Parser.Types.TokenTypes.Word) == true)
      {
        const name: string = this._cursor.Current().value

        this._cursor.Next()

        return new VariableAddress(name)
      }
    }
  }
}

class VariableAssignationParser implements Component.Base<Value>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(layer: Parser.LayerWithReferenceToTop<Value>): void | Value 
  {
    if (this._cursor.Current().value == 'let')
    {
      this._cursor.Next()

      const name: string = this._cursor.Current().value

      this._cursor.Next()

      if (this._cursor.Current().value == '=')
      {
        this._cursor.Next()

        return new VariableAssignation(name, layer.ExecuteTopParser() as Value)
      }
    }
  }
}

class ReferenceToTopExpressionParser implements Component.Base<Value>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(layer: Parser.LayerWithReferenceToTop<Value>): void | Value 
  {
    if (this._cursor.Current().value == '(')
    {
      this._cursor.Next()

      const expression: Value = layer.ExecuteTopParser() as Value

      this._cursor.Next()

      return expression
    }
  }
}

class IntegerParser implements Component.Base<Arithmetic>
{
  public constructor(private _cursor: Parser.Types.Cursor) {}

  public Parse(): void | Arithmetic 
  {
    if (this._cursor.Current().type.Equals(Parser.Types.TokenTypes.Number) == true)
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

  public Parse(): void | StringLike 
  {
    if (this._cursor.Current().type.Equals(Parser.Types.TokenTypes.String) == true)
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

  public Parse(layer: Parser.Layer<Arithmetic>): Arithmetic 
  {
    let result: Arithmetic = layer.ExecuteSuccessorParser() as Arithmetic

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == '*')
      {
        this._cursor.Next()

        result = new Multiplication(result, layer.ExecuteSuccessorParser() as Arithmetic)

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

  public Parse(layer: Parser.Layer<Value>): Value
  {
    let result: Value = layer.ExecuteSuccessorParser() as Value

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == '==')
      {
        this._cursor.Next()

        result = new Equality(result, layer.ExecuteSuccessorParser() as Value)

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

  public Parse(layer: Parser.Layer<Conditional>): Conditional
  {
    let result: Conditional = layer.ExecuteSuccessorParser() as Conditional

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == 'and')
      {
        this._cursor.Next()

        result = new Conjuction(result, layer.ExecuteSuccessorParser() as Conditional)

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

  public Parse(layer: Parser.Layer<Conditional>): Conditional
  {
    let result: Conditional = layer.ExecuteSuccessorParser() as Conditional

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == 'or')
      {
        this._cursor.Next()

        result = new Disjuction(result, layer.ExecuteSuccessorParser() as Conditional)

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

  public Parse(layer: Parser.Layer<Arithmetic>): Arithmetic 
  {
    let result: Arithmetic = layer.ExecuteSuccessorParser() as Arithmetic

    while (this._cursor.Done == false)
    {
      if (this._cursor.Current().value == '+')
      {
        this._cursor.Next()

        result = new Addition(result, layer.ExecuteSuccessorParser() as Arithmetic)

        continue
      }

      break
    }

    return result
  }
}

// @end[assign parser components]

// [USE CASE]

const scanner = MinecraftScanner.Create(`
  (let t = %x) + %t
`)

console.time('scanner.Scan()')
const tokens = scanner.Scan()
console.timeEnd('scanner.Scan()')

const cursor: Parser.Types.Cursor = new Commons.Cursor(tokens) // lifetime is unexpected

const parser: Parser.Base<Value> = new Parser.Base(cursor)

parser.UseTerminal(() => new VariableAddressParser(cursor))
parser.UseTerminal(() => new VariableAssignationParser(cursor))
parser.UseTerminal(() => new ReferenceToTopExpressionParser(cursor))
parser.UseTerminal(() => new IntegerParser(cursor))
parser.UseTerminal(() => new StringParser(cursor))

parser.Use(1, () => new MultiplicationParser(cursor))
parser.Use(2, () => new AdditionParser(cursor))

parser.Use(3, () => new EquationParser(cursor))

parser.Use(4, () => new DisjuctionParser(cursor))
parser.Use(4, () => new ConjuctionParser(cursor))

console.time('parser.Parse()')
const ast: Value[] = parser.Parse()
console.timeEnd('parser.Parse()')

const context: VariableContext = new VariableContext()

context.SetVariable('x', new Integer(10))
context.SetVariable('y', new Integer(20))
context.SetVariable('z', new Integer(2))

console.time('executor.Execute()')
ast.forEach(node => console.log(node.Execute(context)))
console.timeEnd('executor.Execute()')