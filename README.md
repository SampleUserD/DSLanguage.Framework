# DSLanguage.Framework
<div>
  <h2>
    <em>
      This framework can help you create your own programming language from scratch.
    </em>
  </h2>
</div>
<div>
  <b>It has two fundamental subsystems</b>
  <dl> 
    <dt>Scanner</dt>
    <dd>
      This subsystem translates given text to an stream of tokens (see the example below).
      It is necessary intermediate step for building AST (abstract syntax tree).
      Can be adjusted by user (see the example below)
    </dd>
    <dt>Parser</dt>
    <dd>
      This subsystem translates given stream of token to AST (see below an example).
      It is necessary for building AST (abstract syntax tree) in the further steps.
      Can be adjusted by user
    </dd>
  </dl>
</div>
<div>
  <h4 color="red">Important note</h4> 
  <p>DO NOT RECOMMEND USE IT AS LONG AS IT IS NOT REALED</p>
  <p>BECAUSE API CAN CHANGE AT ANY MOMENT WITH NO BACK-COMPABILITY</p>
</div>
<div>
  <h4>Additional info</h4>
  <p>You can look in "./sources" to see how use the framework at the moment.</p>
</div>

# Core

# Scanner subsystem
Scanner itself has two basic methods: Scan(input: string) and AddHandler(handler: Scanner.Handler).
Method AddHandler(handler: Scanner.Handler) adds handler to scan input (this process can be customized by user).
Method Scan(input: string) scans input.

# Parser subsystems
Parser itself has one basic methods: Parse(input: string).
At the moment this subsystem is not finished and is in development.
So usage of this subsystem is not recommended, because it can change unexpectedly.

## Create by Saitov Denis