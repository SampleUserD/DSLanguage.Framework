import { Cursor } from "./Cursor.js"

type QueueCursor = Cursor<QueueMember>
type QueueMember = (queue: Queue, transfer: QueueTransferData) => void

type QueueTransferDataKey = string
type QueueTransferDataValue = string
type QueueTransferData = Map<QueueTransferDataKey, QueueTransferDataValue>

class Queue 
{
  public constructor(private _queue: QueueMember[] = []) {}
  
  private _cursor: Cursor<QueueMember> = new Cursor(this._queue)

  private Execute(data: QueueTransferData): void 
  {
    if (this._cursor.Done == true)
      return undefined

    this._cursor.Current()(this, data)
  }

  public Add(member: QueueMember): void 
  {
    this._queue.push(member)
  }

  public Start(data: QueueTransferData): void 
  {
    this.Execute(data)
  }

  public Next(data: QueueTransferData): void 
  {
    this._cursor.Next()
    this.Execute(data)
  }
}

export { Queue as Base, QueueMember as Member, QueueCursor as Cursor, QueueTransferData as TransferData }