export class Type
{
  public constructor(private _type: string) {}

  public Equals(type: Type): boolean
  {
    return this.Type === type.Type
  }

  public get Type(): string
  {
    return this._type
  }
}