import * as Commons from "#root/Minecraft.Commons/Main"

export function GetWordByLength<T>(cursor: Commons.Cursor<T>, length: number): T[]
{
  const word: T[] = []

  for (let index = 0; index < length; index++, cursor.Next())
  {
    word.push(cursor.Current())
  }

  for (let index = 0; index < length; index++)
  {
    cursor.Previous()
  }

  return word
}