import * as Scanner from '#scanner/Scanner';
import * as Commons from '#commons/Main'

import * as Nodes from './Node.js'


interface Function extends Nodes.Base
{
  type: 'function',
  name: string,
  arguments: Nodes.Block,
  block: Nodes.Base[]
}

interface Callee extends Nodes.Base
{
  type: 'callee',
  name: string,
  arguments: Nodes.Block
}

interface Conditional extends Nodes.Base
{
  type: 'conditional',
  condition: Nodes.Base
  block: Nodes.Block
}

interface Variable extends Nodes.Base
{
  type: 'assignature',
  name: string,
  value: Nodes.Base
}

interface UnaryOperation extends Nodes.Base
{
  type: 'unary-operation',
  operator: string,
  value: Nodes.Base
}

interface BinaryOperation extends Nodes.Base
{
  type: 'binary-operation',
  operator: string,
  left: Nodes.Base,
  right: Nodes.Base
}


/**
 * CONSTANT CONTAINER: ({ PRIORITY: NUMBER, HANDLER: ((CURSOR, TREE) => NODES.BASE)[] })[] = []
 * VARIABLE MAXIMAL_PRIORITY: NUMBER = 0
 * 
 * LOCAL FUNCTION SET_HANDLER_TO(PRIORITY: NUMBER, HANDLER: (CURSOR, TREE) => NODES.BASE): VOID
 * BEGIN
 *  IF MAX_PRIORITY < PRIORITY THEN MAX_PRIORITY = PRIORITY
 * 
 *  IF EXISTS CONTAINER[PRIORITY] IS FALSE THEN CONTAINER.PUSH({})  
 * 
 *  CONTAINER[PRIORITY].PUSH(HANDLER)
 * END
 * 
 * FUNCTION SET_BASE_HANDLER(HANDLER: (CURSOR, TREE) => NODES.BASE): VOID
 * BEGIN
 *  SET_HANDLER_TO(0, HANDLER)
 * END
 * 
 * FUNCTION ADD_HANDLER(PRIORITY: UNSIGNED_INTEGER, HANDLER: (CURSOR, TREE) => NODES.BASE): VOID
 * BEGIN
 *  SET_HANDLER_TO(PRIORITY, HANDLER)
 * END
 * 
 * FUNCTION CALL(PRIORITY: UNSIGNED_INTEGER + [0], CURSOR, TREE): NODES.BASE
 * BEGIN
 *  # CODE HERE
 * END
 * 
 * FUNCTION PEAK(): { PRIORITY: NUMBER, HANDLER: ((CURSOR, TREE) => NODES.BASE)[] }
 * BEGIN
 *  RETURN CONTAINER[LENGTH(CONTAINER) - 1]
 * END
 * 
 * SET_BASE_HANDLER(PARSE_STATEMENT)
 * ADD_HANDLER(1, PARSE_MULTIPLICATION)
 * ADD_HANDLER(2, PARSE_ADDITION)
 * ADD_HANDLER(3, PARSE_COMPARATION)
 * ADD_HANDLER(4, PARSE_COMPLEX_CONDITION)
 * 
 * FUNCTION EXECUTE_OPERATORS(CURSOR: COMMONS.CURSOR<SCANNER.TOKEN.BASE>, TREE: NODES.BASE[]): NODES.BASE
 * BEGIN
 *  CALL(MAX_PRIORITY, CURSOR, TREE)
 * END
 * 
 * EXECUTE_OPERATORS(CURSOR, TREE)
 */

export class Parser 
{
  private ParseExpression(cursor: Commons.Cursor<Scanner.Token.Base>, tree: Nodes.Base[]): Nodes.Base
  {
    return this.ParseComplexBoolean(cursor, tree)
  }

  // priority = 4 
  private ParseComplexBoolean(cursor: Commons.Cursor<Scanner.Token.Base>, tree: Nodes.Base[]): Nodes.Base
  {
    let result: Nodes.Base = this.ParseComparation(cursor, tree)

    while (cursor.Done == false)
    {
      if (cursor.Current().value == 'and')
      {
        cursor.Next()
        result = { operator: 'and', left: result, right: this.ParseComplexBoolean(cursor, tree) } as BinaryOperation

        continue
      }

      
      if (cursor.Current().value == 'or')
      {
        cursor.Next()
        result = { operator: 'or', left: result, right: this.ParseComplexBoolean(cursor, tree) } as BinaryOperation

        continue
      }

      break
    }

    return result
  }

  // priority = 3
  private ParseComparation(cursor: Commons.Cursor<Scanner.Token.Base>, tree: Nodes.Base[]): Nodes.Base
  {
    let result: Nodes.Base = this.ParseAddition(cursor, tree)

    while (cursor.Done == false)
    {
      if (cursor.Current().value == '>')
      {
        cursor.Next()
        result = { operator: '>', left: result, right: this.ParseComparation(cursor, tree) } as BinaryOperation

        continue
      }
      
      if (cursor.Current().value == '<')
      {
        cursor.Next()
        result = { operator: '<', left: result, right: this.ParseComparation(cursor, tree) } as BinaryOperation

        continue
      }

      if (cursor.Current().value == '==')
      {
        cursor.Next()
        result = { operator: '=', left: result, right: this.ParseComparation(cursor, tree) } as BinaryOperation

        continue
      }

      break
    }

    return result
  }

  // priority = 2
  private ParseAddition(cursor: Commons.Cursor<Scanner.Token.Base>, tree: Nodes.Base[]): Nodes.Base
  {
    let result: Nodes.Base = this.ParseMultiplication(cursor, tree)

    while (cursor.Done == false)
    {
      if (cursor.Current().value == '+')
      {
        cursor.Next()
        result = { operator: '+', left: result, right: this.ParseAddition(cursor, tree) } as BinaryOperation

        continue
      }
      
      if (cursor.Current().value == '-')
      {
        cursor.Next()
        result = { operator: '-', left: result, right: this.ParseAddition(cursor, tree) } as BinaryOperation

        continue
      }

      break
    }

    return result
  }

  // priority = 1 (USES "BASE")
  private ParseMultiplication(cursor: Commons.Cursor<Scanner.Token.Base>, tree: Nodes.Base[]): Nodes.Base
  {
    let result: Nodes.Base = this.ParseStatement(cursor, tree)

    while (cursor.Done == false)
    {
      if (cursor.Current().value == '*')
      {
        cursor.Next()
        result = { operator: '*', left: result, right: this.ParseMultiplication(cursor, tree) } as BinaryOperation

        continue
      }
      
      if (cursor.Current().value == '/')
      {
        cursor.Next()
        result = { operator: '/', left: result, right: this.ParseMultiplication(cursor, tree) } as BinaryOperation

        continue
      }

      break
    }

    return result
  }

  // priority = 0 [BASE]
  private ParseStatement(cursor: Commons.Cursor<Scanner.Token.Base>, tree: Nodes.Base[]): Nodes.Base
  {
    const token: Scanner.Token.Base = cursor.Current()

    if (token.type == Scanner.Token.Types.Basic.Comment) 
    {
      cursor.Next()

      return { type: 'comment', value: token.value } as Nodes.Primitive
    }

    if (token.type == Scanner.Token.Types.Basic.Number) 
    {
      cursor.Next()

      return { type: 'number', value: token.value } as Nodes.Primitive
    }

    if (token.value == '(')
    {
      cursor.Next()

      const result: Nodes.Base = this.ParseExpression(cursor, tree)

      cursor.Next()

      return result
    }

    // { [...nodes: Node.Base[]] }
    if (token.value == '{')
    {
      cursor.Next()

      const nodes: Nodes.Base[] = []

      while (cursor.Current().value != '}')
      {
        nodes.push(this.ParseExpression(cursor, tree))
      }

      cursor.Next()

      return { type: 'block', nodes: nodes } as Nodes.Block
    }

    // schema "if <expression> then <block>"
    if (token.value == 'if')
    {
      cursor.Next()

      const expression: Nodes.Base = this.ParseExpression(cursor, tree)

      if (cursor.Current().value == 'then')
      {
        cursor.Next()

        const block: Nodes.Base = this.ParseExpression(cursor, tree)

        return { condition: expression, block: block } as Conditional
      }
    }

    if (token.value == 'def') 
    {
      const name: Scanner.Token.Base = cursor.Next()
      cursor.Next()

      const nodes: Nodes.Base[] = []

      if (cursor.Current().value == '(')
      {
        cursor.Next()

        while (cursor.Current().value != ')')
        {
          nodes.push(this.ParseExpression(cursor, tree))

          if (cursor.Current().value != ',')
          {
            break
          } else 
          {
            cursor.Next()
          }
        }

        cursor.Next()
      }

      const block: Nodes.Base[] = [ this.ParseExpression(cursor, tree) ]

      return { name: name.value, arguments: { nodes: nodes } as Nodes.Block, block } as Function
    }

    if (token.value == 'let') 
    {
      const name: Scanner.Token.Base = cursor.Next()
      cursor.Next()

      if (cursor.Current().value == '=') 
      {
        cursor.Next()
        const value: Nodes.Base = this.ParseExpression(cursor, tree); 

        return { name: name.value, value: value } as Variable
      }
    }

    if (token.type == Scanner.Token.Types.Basic.Word)
    {
      cursor.Next()

      if (cursor.Current()?.value == '(')
      {
        cursor.Next()
        const nodes: Nodes.Base[] = []

        while (cursor.Current().value != ')')
        {
          nodes.push(this.ParseExpression(cursor, tree))
          
          if (cursor.Current().value != ',')
          {
            break
          } else 
          {
            cursor.Next()
          }
        }

        cursor.Next()

        return { name: token.value, arguments: { nodes: nodes } as Nodes.Block } as Callee
      }
      
      return { type: 'variable', value: token.value } as Nodes.Primitive
    }

    throw new Error(`Parse error: token(type=${ token.type }, value=${ token.value }) can not be parsed correctly`)
  }

  public Parse(tokens: Scanner.Token.Base[]): Nodes.Base[] 
  {
    const cursor: Commons.Cursor<Scanner.Token.Base> = new Commons.Cursor(tokens)
    const tree: Nodes.Base[] = []

    while (cursor.Done == false)
    {
      tree.push(this.ParseExpression(cursor, tree))     
    }

    return tree
  }
}