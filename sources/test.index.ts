import * as MinecraftScanner from './scanner/Main.js'

import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import beautify from "json-beautify"

import { Parser } from '#root/Minecraft.Parser/_Parser'

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = path.dirname(__filename)

const baseDirectory = `./sources/test-programs`

const inputDirectory: string = `${ baseDirectory }/inputs`
const outputDirectory: string = `${ baseDirectory }/outputs`
const resultsOutputFilename: string = `${ baseDirectory }/tests.result`
const prefix: string = 'test.';

async function Test__OutputReferenceAboutLanguageFromTo(input: string, output: string): Promise<void> 
{
  const data = await fs.promises.readFile(input) as Buffer

  const tokens = MinecraftScanner.Base.Scan(data?.toString())

  const parser = new Parser()
  const ast = parser.Parse(tokens)


  await fs.promises.writeFile(output, '# REFERENCE: TEXT --> SCANNER --> PARSER\n')
  // @block "raw text"
  await fs.promises.appendFile(output, `----------- @begin "raw text" -----------\n\n`)
  await fs.promises.appendFile(output, data?.toString())
  await fs.promises.appendFile(output, `\n\n------------ @end "raw text" ------------\n`)
  
  // @block "scanned text"
  await fs.promises.appendFile(output, `----------- @begin "scanned text" -----------\n\n`)
  await fs.promises.appendFile(output, `${ beautify(tokens, null, 2) }`)
  await fs.promises.appendFile(output, `\n\n------------ @end "scanned text" ------------\n`)

  // @block "parsed text (AST)"
  await fs.promises.appendFile(output, `----------- @begin "parsed text (AST)" -----------\n\n`)
  await fs.promises.appendFile(output, `${ beautify(ast, null, 2) }`)
  await fs.promises.appendFile(output, `\n\n------------ @end "parsed text (AST)" ------------`)
}

async function Test__ClearOutputDirectory(): Promise<void>
{
  const directoryContent = await fs.promises.readdir(outputDirectory)

  directoryContent.forEach(async filename => 
  {
    await fs.promises.rm(path.join(outputDirectory, filename))
  })
}

async function Test__LanguageSubModulesAndOutputInformation(inputs: string[]): Promise<void> 
{
  const unpassedTestResults: ({ index: number, error: Error })[] = []

  for (let index = 0; index < inputs.length; index++)
  {
    const inputPath = path.parse(
      inputs[index].substring(inputs[index].indexOf(prefix) + prefix.length, inputs[index].length)
    )

    const input: string = path.join(inputDirectory, `${ inputs[index] }`)
    const output: string = path.join(outputDirectory, `${ inputPath.name }.output`)

    try 
    {
      await Test__OutputReferenceAboutLanguageFromTo(input, output)
    } catch (error: unknown)
    {
      unpassedTestResults.push({ index, error: error as Error })
      await fs.promises.writeFile(output, (error as Error).stack as string)
    }
  }

  await fs.promises.writeFile(resultsOutputFilename, new String())

  for (let index = 0; index < inputs.length; index++)
  {
    const result = unpassedTestResults.find(result => result.index === index)  

    if (result !== undefined)
    {
      await fs.promises.appendFile(resultsOutputFilename, `${index}) ${ inputs[index] } [unpassed]\n`)
    } else 
    {
      await fs.promises.appendFile(resultsOutputFilename, `${index}) ${ inputs[index] } [passed]\n`)
    }
  }
  
  await fs.promises.appendFile(resultsOutputFilename, `\n#[SHORT INFORMATION]`)
  await fs.promises.appendFile(resultsOutputFilename, `\nALL TESTS LENGTH - ${ inputs.length  }`)
  await fs.promises.appendFile(resultsOutputFilename, `\nPASSED TESTS LENGTH - ${ inputs.length - unpassedTestResults.length }`)
  await fs.promises.appendFile(resultsOutputFilename, `\nUNPASSED TESTS LENGTH - ${ unpassedTestResults.length }`)
  await fs.promises.appendFile(resultsOutputFilename, `\nSUCCESS RATE - ${ ((inputs.length - unpassedTestResults.length) / inputs.length * 100).toFixed(2) }%`)
}

(async function(): Promise<void>
{
  await Test__ClearOutputDirectory()
  await Test__LanguageSubModulesAndOutputInformation(
    (await fs.promises.readdir(inputDirectory)).filter(filename => filename.startsWith(prefix) == true)
  )
})()