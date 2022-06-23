export function TranslateObjectToMap<V>(object: { [key: string]: V }): Map<string, V>
{
  const map: Map<string, V> = new Map()

  for (let index in object)
    map.set(index, object[index])

  return map
}