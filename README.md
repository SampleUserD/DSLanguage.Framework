# DSLanguage.Framework
<div>
  <h3>
    <em>
      This framework can help you create your own programming language from scratch.
    </em>
  </h3>
</div>
<div>
  <h3>First of all, DSLanguage.Framework has two main subsystems</h3>
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
  <h4 color="red">Important note</h4> 
  <p>
    DO NOT RECOMMEND USE IT AS LONG AS IT IS NOT REALISEED,
    BECAUSE API CAN CHANGE AT ANY MOMENT WITH NO BACK-COMPABILITY.
    DOWNLOAD THIS PACKAGE ON YOUR OWN RISK!
  </p>
</div>

# Core
  No documentation yet, because this subsystem does not exist

# Scanner subsystem
  This subsystem translates given text to an stream of tokens (see an example below).
  It is necessary intermediate step for building AST (abstract syntax tree).

  This subsystem have two main methods:
  * `ts Scan(input: string): Scanner.Token.Base[]` - scans input by customisable handler
  * `ts AddHandler(handler: Scanner.Handler): void` - adds customisable handler


# Parser subsystems
  This subsystem translates given stream of token to AST (see below an example).
  

Parser itself has one basic methods: Parse(input: string).
At the moment this subsystem is not finished and is in development.
So usage of this subsystem is not recommended, because it can change unexpectedly.

<p>This package created by Saitov Denis</p>