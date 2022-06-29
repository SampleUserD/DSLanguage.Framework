# DSLanguage.Framework
<div>
  <h3>
    <em>
      This framework can help you create your own programming language from scratch.
    </em>
  </h3>
</div>
<div>
  <h4>First of all, DSLanguage.Framework has two main subsystems</h4>
  <ul> 
    <li>Scanner</li>
    <li>Parser</li>
  </ul>
</div>

# Scanner subsystem
  This subsystem translates given text to an stream of tokens (see an example below).
  It is necessary intermediate step for building AST (abstract syntax tree).

  You can plug in this subsystem into your code as:
  `import * as Scanner from '<path-to-framework>/DSLF.Scanner'`
  
  This subsystem has such public components:
  - `namespace Scanner.Token`
  - `namespace Scanner.Commons`
  - `interface Scanner.Component`
  - `interface Scanner.Context`
  - `class Scanner.Base`

  ## Scanner.Token
  - Scanner.Token is the namespaces that contains basic definition for Token
  - Token is an object that contains specific information about language symbol (DTO)
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

  ## Scanner.Commons
  - Scanner.Commons is the namespace that contains basic type declarations that necessary for scanner
  
  ## Scanner.Component
  - Scanner.Component is the basic definition for scanner component
  - Components are main functional parts of scanner (a.k.a "subscanners")
  - Members:
    - `Scan(context: Scanner.Context, cursor: Scanner.Commons.Cursor): Scanner.Token.Base | void` - scanning strategy  
    
  ## Scanner.Context
  - Scanner.Context is the basic definition for context, where components of scanner can share some information 

  ## Scanner.Base
  - Scanner.Base is the type of scanner itself
  - This class has two main methods to use:
    - `Scan(input: string): Scanner.Token.Base[]` - scans input by customisable handler
    - `AddHandler(handler: Scanner.Handler): void` - adds customisable handler

  ## Examples of usage
    You can look in directory 'examples/scanner' to see how this subsystem works

# Parser subsystems
  This subsystem translates given stream of token to AST (see below an example).
  
  You can plug in this subsystem into your code as:
  `import * as Parser from '<path-to-framework>/DSLF.Parser'`

  This subsystem has such public components:
  - `namespace Parser.Types`
  - `namespace Parser.Nodes`
  - `namespace Parser.Components`
  - `abstract class Parser.Layer<T extends Parser.Nodes.Base>`
  - `abstract class Parser.LayerWithReferenceToTop<T extends Parser.Nodes.Base>`
  - `class Parser.Base<T extends Parser.Nodes.Base>`
  
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

  ## Parser.Component
  - `Parser.Component` is the namespace that contains basic definitions for components
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
    - `Use(priority: number, parser: () => Parser.Component.Base<T>): void` - method that adds non-terminal expression parsers to base parser with given priority (bigger `priority` => less priority)
    - `Parse(): T[]`

  ## Examples of usage
    You can look in directory 'examples/parser' to see how this subsystem works

# Requirements
- NodeJS (last stable version)
- NPM

# How to download and configure this package
- Go to folder with your project
- Open terminal in this directory
- You need to download typescript. Just type `npm i typescript` into terminal
- After downloading, type `tsc --build .` into terminal

___

***This package created by Saitov Denis***
