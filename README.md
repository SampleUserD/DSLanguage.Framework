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
<div>
  <h4>Additional info</h4>
  <p>You can look in "./sources" to see how use the framework at the moment.</p>
</div>
<div>
  <h4>Important note</h4> 
  <p>
    DO NOT RECOMMEND USE IT AS LONG AS IT IS NOT REALISED,
    BECAUSE API CAN CHANGE AT ANY MOMENT WITH NO BACK-COMPABILITY.
    <b>DOWNLOAD THIS PACKAGE ON YOUR OWN RISK!</b>
  </p>
</div>

# Scanner subsystem
  This subsystem translates given text to an stream of tokens (see an example below).
  It is necessary intermediate step for building AST (abstract syntax tree).

  You can plug in this subsystem into your code as:
  `import * as Scanner from '<path-to-framework>/DSLF.Scanner'`
  
  This subsystem has such public components:
  - `namespace Scanner.Token`
  - `namespace Scanner.Commons`
  - `interface Scanner.Handler`
  - `class Scanner.Base`

  ## Scanner.Token
  - Scanner.Token is the namespaces that contains basic definition for Token
  - Token is an object that contains specific information about symbol (DTO)
  - Members:
    - `type Token.Base` - basic definition of token
      - `type: Token.Types.Basic` - type of token
      - `value: Token.Value` - symbol
      - `information: Token.Information.Base` - additional information about token (useless at the moment)
        - `placement: Placement` - information about placement of symbol (useful for debugging)

  ## Scanner.Commons
  - Scanner.Commons is the namespace that contains basic type declarations that necessary for scanner
  
  ## Scanner.Handler
  - Scanner.Handler is the basic definition for handlers
  - Handlers are main functional parts of scanner (a. k. a "subscanners")
  - Members:
    - `Execute(cursor: Scanner.Commons.Cursor, tokens: Scanner.Token.Base[]): void` - scanning strategy  

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
  - `class Parser.Environment<T extends Parser.Nodes.Base>`
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
      - `Executable.Execute(): T` - execution strategy
    - `namespace Default` - namespace that contains default nodes realisations
      - `namespace Default.Block`
      - `namespace Default.Primitives`

  ## Parser.Component
  - Parser.Component is the namespace that contains basic definitions for components
  - Components are the main functional parts of the parser (a.k.a "subparsers"). 
    The main purpose of the components is generation AST (abstract syntax tree)
  - Members:
    - `interface Base<T extends Parser.Nodes.Base>` - definition for basic component
      - `Base.Parse(environment: Environment<T>): T` - parsing strategy

  ## Parser.Environment
  - Parser.Environment is an environment of components execution
  - It is a internal component of system so do not use as real class, but as type declaration

  ## Parser.Base
  - Parser.Base is the type of parser itself. 
  - This class has two main methods you can use:
    - `Use(priority: number, parser: () => Parser.Component.Base<T>): void` - method that adds given component to parser with given priority (bigger `priority` => less priority)
    - `Parse(): T[]`

  ## Examples of usage
    You can look in directory 'examples/parser' to see how this subsystem works

___

***This package created by Saitov Denis***
