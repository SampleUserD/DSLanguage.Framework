# DSLanguage.Framework
<div>
  <h3>
    <em>
      Create your own truly amazing programming language from scratch. :heart:
    </em>
  </h3>
</div>
<div>
  <h4>First of all, DSLanguage.Framework has two main subsystems</h4>
  <ul> 
    <li>
      <a href="#scanner-subsystem">Scanner</a>
    </li>
    <li>
      <a href="#parser-subsystem">Parser</a>
    </li>
  </ul>
</div>
<div>
  <h4>Additional links and possible questions</h4>
  <ul> 
    <li>
      <a href="#examples-of-usage">Examples of usage</a>
    </li>
    <li>
      <a href="#requirements">Requirements</a>
    </li>
    <li>
      <a href="#how-to-download-and-configure-this-package">How to download and configure this package</a>
    </li>
  </ul>
</div>

# Scanner subsystem
  This subsystem translates given text to an stream of [tokens](https://en.wikipedia.org/wiki/Lexical_token).
  It is necessary intermediate step for building [AST (abstract syntax tree)](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

  You can plug in this subsystem into your code as:
  `import * as Scanner from '<path-to-framework>/DSLF.Scanner'`
  
  This subsystem has such public components:
  - [`namespace Scanner.Token`](#scannertoken)
  - [`namespace Scanner.Types`](#scannertypes)
  - [`interface Scanner.Component`](#scannercomponent)
  - [`interface Scanner.Context`](#scannercontext)
  - [`class Scanner.Base` :bulb:](#scannerbase)

## Scanner.Token
  - `Scanner.Token` is the namespaces that contains basic definition for [Token](https://en.wikipedia.org/wiki/Lexical_token)
  - Token is an object that contains specific information about language symbol
  - Members:
    - `namespace Types`
      - `class Base` - basic definition for type of token
      - `class Basic` - most frequently used types of token
    - `namespace Information`
      - `interface Base<T>` - basic definition of additional information about token
      - `namespace Defaults` - most frequently used types of additional information about token 
        - `class Placement` - class that have information about token's placement
    - `type Base` - basic definition of token
      - `type: Token.Types.Base` - type of token
      - `value: Token.Value` - value of token
      - `placement: Token.Information.Defaults.Placement` - information about placement of symbol

  ## Scanner.Types
  - `Scanner.Types` is the namespace that contains basic type declarations that necessary for scanner
  - Members:
    - `type Cursor`
    - `type Accumulator`
  
  ## Scanner.Component
  - `Scanner.Component` is the basic definition for scanner component
  - Components are main functional parts of scanner (a.k.a "subscanners")
  - Members:
    - `Scan(context: Scanner.Context, cursor: Scanner.Commons.Cursor): Scanner.Token.Base | void` - scanning strategy  
    
  ## Scanner.Context
  - `Scanner.Context` is the basic definition for context, where components of scanner can share some information 

  ## Scanner.Base
  - `Scanner.Base` is the type of scanner itself
  - This class has two main methods to use:
    - `Scan(input: string): Scanner.Token.Base[]` - scans input by customisable handler
    - `Use(component: () => Scanner.Component): void` - adds customisable handler

# Parser subsystem
  This subsystem translates given stream of token to [AST (abstract syntax tree)](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
  
  You can plug in this subsystem into your code as:
  `import * as Parser from '<path-to-framework>/DSLF.Parser'`

  This subsystem has such public components:
  - [`namespace Parser.Types`](#parsertypes)
  - [`namespace Parser.Nodes`](#parsernodes)
  - [`namespace Parser.Components`](#parsercomponents)
  - [`abstract class Parser.Layer<T extends Parser.Nodes.Base>`](#parserlayer)
  - [`abstract class Parser.LayerWithReferenceToTop<T extends Parser.Nodes.Base>`](#parserlayerwithreferencetotop)
  - [`class Parser.Base<T extends Parser.Nodes.Base>` :bulb:](#parserbase)
  
  ## Parser.Types
  - Parser.Types is the namespace that contains basic type declarations that necessary for parser

  ## Parser.Nodes 
  - Parser.Nodes is the namespace that contains basic definitions for nodes
  - Node is an element of AST (abstract syntax tree).
  - Members:
    - `interface Base` - basic definition of node
    - `interface Translatable` - definition for translatable node
      - `Translatable.Translate(): string` - translation strategy
    - `interface Executable<T> extends Base` - definition for executable node
      - `Executable.Execute(context: Parser.Nodes.Additional.Context): T` - execution strategy
    - `namespace Default` - namespace that contains default nodes realisations
      - `namespace Default.Block`
      - `namespace Default.Primitives`
    - `namespace Additional`
      - `interface Context`
    - `namespace Categories` - namespace that contains various categories for nodes
      - `type Terminal` - type for [`terminal node`](https://www.geeksforgeeks.org/introduction-to-grammar-in-theory-of-computation/#:~:text=Terminal%20symbols%20are%20those%20which,a%2C%20b%2C%20c%20etc.&text=Non%2DTerminal%20Symbols%20are%20those,the%20component%20of%20the%20sentence.)

  ## Parser.Components
  - `Parser.Components` is the namespace that contains basic definitions for components
  - Components are the main functional parts of the parser (a.k.a "subparsers"). 
    The main purpose of the components is generation AST (abstract syntax tree)
  - Members:
    - `interface Base<T extends Parser.Nodes.Base>` - definition for basic component
      - `Base.Parse(environment: Environment<T>): T` - parsing strategy

  ## Parser.Layer
  - `Parser.Layer` is a part of recursive descent parsing
  - Members:
    - `ExecuteSuccessorParser(): T` - method that calls successor layer parser
    
  ## Parser.LayerWithReferenceToTop
  - `Parser.LayerWithReferenceToTop` is the same as `Parser.Layer` but with reference to top layer
  - Members:
    - `ExecuteSuccessorParser(): T` - method that calls successor layer parser
    - `ExecuteTopParser(): T` - method that calls top layer parser

  ## Parser.Base
  - `Parser.Base` is the type of parser itself. 
  - This class has two main methods you can use:
    - `UseTerminal(parser: () => Parser.Component.Base<T>): void` - methods that adds terminal expression parsers to base parser
    - `Use(priority: number, parser: () => Parser.Component.Base<T>): void` - method that adds non-terminal expression parsers to base parser with given priority (bigger `priority` = less priority)
    - `Parse(): T[]`

# Examples of usage
  Go to file [`Examples/Example.ts`](https://github.com/SampleUserD/DSLanguage.Framework/blob/master/Examples/Example.ts) and look at how this used for create your own programming language

# Requirements
These requirements are unconcrete, so they can be changed in the future
- NodeJS (last stable version)
- NPM

# How to download and configure this package
1. Go to folder with your project
2. Open terminal in this folder
4. After downloading, type `npm i js-ds-language-framework --save-dev`
5. You're ready! Enjoy!

___

***This package created by Saitov Denis***
