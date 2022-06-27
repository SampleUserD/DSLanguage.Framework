import { Information } from '../Information.js';

type Placement = { Row: number, Column: number }

export class PlacementInformation implements Information<Placement>
{
  public constructor(private _row: number, private _column: number) {}

  public get Row(): number
  {
    return this._row
  }

  public get Column(): number
  {
    return this._column
  }

  public get Information(): Placement
  {
    return { Row: this._row, Column: this._column }
  }
}