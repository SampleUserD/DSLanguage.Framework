export type Position = number;

export class Cursor<T>
{
  private _position: Position = 0;

  public constructor(private _container: T[]) {}
    
  public Previous(): T
  {
    return this._container[--this._position]
  }

  public Next(): T
  {
    return this._container[++this._position]
  }

  public Current(): T
  {
    return this._container[this._position]
  }

  public get Position(): Position  
  {
    return this._position
  }

  public get Done(): boolean
  {
    return this._position >= this._container.length || this._position < 0
  }
}