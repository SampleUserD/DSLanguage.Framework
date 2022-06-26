import * as BasicScanner from '../scanner/Main.js'
import * as Scanner from '../../DSLF.Scanner/Scanner.js'

it('should have property "Base"', () => 
{
  expect(BasicScanner).toHaveProperty('Base')
})

it('should have "Base" property instanceof "Scanner"', () => 
{
  expect(BasicScanner.Base).toBeInstanceOf(Scanner.Base)
})

it('should parse strings with double quotes correctly', () => 
{
  const tokens = BasicScanner.Base.Scan('"hello"')
  
  expect(tokens).toEqual([ { type: Scanner.Token.Types.Basic.String, value: 'hello' } ])
})

it('should parse string with single quotes correctly', () => 
{
  const tokens = BasicScanner.Base.Scan(`'hello'`)
  
  expect(tokens).toEqual([ { type: Scanner.Token.Types.Basic.String, value: 'hello' } ])
})