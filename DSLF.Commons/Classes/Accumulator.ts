export class Accumulator<T>
{
  private _container: T[] = []

  public constructor(private _checker: (item: T) => boolean) {}

  public Accumulate(item: T): void
  {
    if (this.Matches(item) == true)
      this._container.push(item)
  }

  public Matches(item: T): boolean
  {
    return this._checker(item) == true
  }

  public get Result(): T[] 
  {
    return Array.from(this._container)
  }
}