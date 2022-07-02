/**
 * @requires 'js-ds-language-framework'
 */

/** 
 * Commons is just a library with common classes
 * That is very convenience to use 
 */
import { Commons, Scanner, Parser } from 'js-ds-language-framework';

import Token = Scanner.Token.Base;
import CreateToken = Scanner.Token.Create;
import BasicTokenTypes = Scanner.Token.Types.Basic;

import Terminal = Parser.Nodes.Categories.Terminal;

/**
 * @classdesc
 * This is example of scanner component usage
 * This component scans number from input through Commons.Cursor class
 */
class NumberScanner implements Scanner.Component {
  /**
   * Just cozy method to check that characters meets conditions
   * 
   * @param {string} character 
   * @returns {boolean}
   */
  private Match(character: string): boolean {
    return /[0-9\.]/.test(character);
  }

  /**
   * @description
   * This is the main method of this class
   * It provides the strategy of scanning
   * 
   * @param {Scanner.Context} context - execution context of this scanner component 
   * @param {Scanner.Types.Cursor} cursor - cursor to given input string
   *
   * @implements {Scanner.Component}
   * 
   * @returns {Scanner.Token.Base | void}
   */
  public Scan(context: Scanner.Context, cursor: Scanner.Types.Cursor): Token | void {
    const accumulator: Scanner.Types.Accumulator = new Commons.Accumulator(x => this.Match(x));

    /** 
     * Accumulator accumulates characters from cursor
     * As long as it matches condition 
     */
    for (cursor; accumulator.Matches(cursor.Current()); cursor.Next()) {
      accumulator.Accumulate(cursor.Current());
    }

    /** 
     * If accumulator results is not empty 
     * Then creates token with type number and such value and returns it
     * Else returns nothing  
     */
    if (accumulator.Empty == false) {
      return CreateToken(BasicTokenTypes.Number, accumulator.Result.join(Commons.Constants.EMPTY_STRING));
    }
  }
}

type ArithmeticalNode = Parser.Nodes.Executable<number>

/**
 * @classdesc
 * This class simulates executable node 
 * That presents number in our programming language
 */
class NumberNode implements ArithmeticalNode {
  public constructor(private _value: number) {}

  /**
   * @description
   * It is the main method of this class
   * It provides strategy of execution
   *
   * @param {Parser.Nodes.Additional.Context} context - execution context of this node 
   */
  public Execute(context: Parser.Nodes.Additional.Context): number {
    return this._value as number;
  }
}

/**
 * @classdesc
 * This class simulates executable node 
 * That presents number in our programming language
 */
class NumberParser implements Parser.Components.Base<ArithmeticalNode> {
  /**
   * @warning
   * Pay attention to this fact that you need to pass through constructor
   * Cursor to stream of tokens
   * 
   * @param {Parser.Types.Cursor} _cursor 
   */
  public constructor(private _cursor: Parser.Types.Cursor) {}
  
  /**
   * @description
   * method Match() is just for convience in work with tokens
   * 
   * @param {Parser.Types.Token} token 
   */
  private Match(token: Parser.Types.Token): boolean {
    return token.type.Equals(BasicTokenTypes.Number);
  }

  /**
   * @description
   * This is the main method of this class
   * It provides strategy of parsing
   * 
   * @param { Parser.Layer<void | ArithmeticalNode>} layer - current layer parser
   * 
   * @returns {void | ArithmeticalNode}
   */
  public Parse(layer: Parser.Layer.Base<Terminal<ArithmeticalNode>>): Terminal<ArithmeticalNode> {
    /** 
     * If this parser finds token with type "number" then returns instance of NumberNode
     * Else returns nothing
     */
    if (this.Match(this._cursor.Current())) {
      const number: number = parseFloat(this._cursor.Current().value)
      
      this._cursor.Next()

      return new NumberNode(number)
    }
  }
}

/** 
 * Now we should do basic configuration 
 */

class EmptyScannerContext implements Scanner.Context {}
class EmptyParserContext implements Parser.Nodes.Additional.Context {}

/**
 * Try to pass different value to input
 */
const input: string = `100`
const cursorToInput = new Commons.Cursor<string>(input.split(Commons.Constants.EMPTY_STRING))

/**
 * @warning
 * Scanner can be used just once! 
 * You should recreate the scanner and reconfigure everytime you want to use this
 * You can solve this problem by pattern factory
 * 
 * @description
 * Generates stream of tokens
 */
const scanner = new Scanner.Base(cursorToInput)

/** 
 * @description
 * Require to scanner our scanner of numbers 
 */
scanner.Use(() => new NumberScanner())

const tokens = scanner.Scan(new EmptyScannerContext())

/** 
 * Test it yourself!
 * This should output: 
 * [
 *  {
 *    type: Type { _type: 'number' },
 *    value: '100',
 *    placement: undefined
 *   }
 * ]
 */
console.log(tokens)

const cursorToTokens = new Commons.Cursor(tokens)

/**
 * @warning
 * Parser can be used just once! 
 * You should recreate the parser and reconfigure everytime you want to use this
 * You can solve this problem by pattern factory
 * 
 * @description
 * Generates stream of tokens
 */
const parser = new Parser.Base<ArithmeticalNode>(cursorToTokens)

parser.UseTerminal(() => new NumberParser(cursorToTokens))

const ast = parser.Parse()

/** 
 * Test it yourself!
 * Outputs: [ NumberNode { _value: 100 } ] 
 */
console.log(ast)

const parserContext = new EmptyParserContext()

/** 
 * Test it yourself!
 * Outputs: 100
 */
ast.forEach(node => console.log(node.Execute(parserContext)))

/** 
 * Great! You just created your first programming language
 * Keep going to learn this framework if you want!
 * Thank you very much for your attention! 
 */
