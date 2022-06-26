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

# Core
  No documentation yet, because this subsystem does not exist

# Scanner subsystem
  This subsystem translates given text to an stream of tokens (see an example below).
  It is necessary intermediate step for building AST (abstract syntax tree).

  You can plug in this subsystem into your code as:
  `import * as Scanner from '<path-to-framework>/DSLF.Scanner'`

  This subsystem has two main methods:
  - `Scan(input: string): Scanner.Token.Base[]` - scans input by customisable handler
  - `AddHandler(handler: Scanner.Handler): void` - adds customisable handler


# Parser subsystems
  This subsystem translates given stream of token to AST (see below an example).
  
  You can plug in this subsystem into your code as:
  `import * as Parser from '<path-to-framework>/DSLF.Parser'`

  This subsystem has such public components:
  - `namespace Parser.Nodes`
  - `namespace Parser.Types`
  - `namespace Parser.Components`
  - `class Parser.Environment<T extends Parser.Nodes.Base>`
  - `class Parser.Base<T extends Parser.Nodes.Base>`

  ## Parser.Base
  - Parser.Base is typeof parser itself. 
  - This class has two main methods you can use:
    - `Use(priority: number, parser: Parser.Component.Base<T>): void`
    - `Parse(): T[]`

  ## Parser.Nodes 
  - Parser.Nodes is the namespace that contains basic definitions for nodes
  - Node is element of AST (abstract syntax tree).
  - Members:
    - `interface Base` - definition for basic node
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

  ## Parser.Types
  - Parser.Types is the namespace that contains basic type declarations that necessary for parser

  ## Examples of usage
    You can look in directory 'examples/parser' to see how this subsystem works

___

***This package created by Saitov Denis***