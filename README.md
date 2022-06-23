# Language.Framework
This framework can be useful for creating programming language
It has two basic classes subsystems: Scanner and Parser
At the moment it is not finished fully yet and qcan be changed any moment

Directory "./sources" shows usage of the framework
Others directories are subsystems of the framework  

# Scanner subsystem
Scanner itself has two basic methods: Scan(input: string) and AddHandler(handler: Scanner.Handler)
Method AddHandler(handler: Scanner.Handler) adds handler to scan input (this process can be customized by user)
Method Scan(input: string) scans input 

# Parser subsystem [DEVELOPMENT]
Parser itself has one basic methods: Parse(input: string)
At the moment this subsystem is not finished and is in development
So usage of this subsystem is not recommended, because it can change unexpectedly

## Author: Saitov Denis