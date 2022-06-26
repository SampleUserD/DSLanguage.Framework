import * as Commons from "#root/DSLF.Commons/Main"

export function MoveBy<T>(cursor: Commons.Cursor<T>, offset: number): void 
{
  const _method: () => void = () => (offset >= 0) ? cursor.Next() : cursor.Previous();
  const _offset: number = Math.abs(offset)

  for (let index = 0; index < _offset && cursor.Done == false; index++)
  {
    _method()
  }
}