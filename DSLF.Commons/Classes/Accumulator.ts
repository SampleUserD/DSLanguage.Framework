export class Accumulator<T>
{
  private _container: T[] = []

  public constructor(private _checker: (item: T, result: T[]) => boolean) {}

  public Accumulate(item: T): void
  {
    if (this.Matches(item) == true)
      this._container.push(item)
  }

  public Matches(item: T): boolean
  {
    return this._checker(item, this._container) == true
  }

  public get Result(): T[] 
  {
    return Array.from(this._container)
  }

  public get Empty(): boolean
  {
    return (this._container.length == 0)
  }
}