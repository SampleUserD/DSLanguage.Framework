import * as Scanner from "#root/DSLF.Scanner/Main"
import * as Commons from "#root/DSLF.Commons/Main"

import { InfiniteRecursion } from "./Behavior.InfiniteRecursion.js"

import { MultilineComment } from "./Token.MultiLineComment.js"
import { Operator } from "./Token.Operator.js"
import { Comment } from "./Token.Comment.js"
import { String } from "./Token.String.js"
import { Number } from "./Token.Number.js"
import { Space } from "./Token.Space.js"
import { Word } from "./Token.Word.js"

/** 
 * Scanner for minecraft utility language
 * 
 * @author Saitov Denis
 * 
 * @TODO Add state to handler-classes (or event bus for them) back-compability
 * @TODO Add custom types for tokens with back-compability
 * @TODO Add table of characters with features of: reserving family of characters and using them (for statistics)
 * @TODO Add component-classes to replace handler-clases
 * 
 * @TODO Do not change Commons/Classes more never ever (API)
 * 
 * @TODO You can do minecraft.parser yet
 * 
 * @TODO Fix the bug with scanning token:word
 * 
 * @TODO Test the application, lazy ass
 * 
 * @TODO Pattern-templates: types, meta-types, generics and etc.
 * @TODO Pattern-priorities: 0: [...statements] --> 1: [unary + -] --> 2: [binary * /] --> 3: [...] --> ...
 * @TODO Pattern-nodes: base, blocks, primitives, customs
 */

function CreateMinecraftLanguageScanner(input: string): Scanner.Base
{
  const scanner: Scanner.Base = new Scanner.Base(new Commons.Cursor<string>(input.split(Commons.Constants.EMPTY_STRING)))

  scanner.AddHandler(() => new MultilineComment('@begin', '@end'))
  scanner.AddHandler(() => new String(`"`, `"`))
  scanner.AddHandler(() => new String(`'`, `'`))

  scanner.AddHandler(() => new Operator())
  scanner.AddHandler(() => new Comment())
  scanner.AddHandler(() => new Number())
  scanner.AddHandler(() => new Space())
  scanner.AddHandler(() => new Word())

  scanner.AddHandler(() => new InfiniteRecursion(2))

  return scanner
}

export { CreateMinecraftLanguageScanner as Create }