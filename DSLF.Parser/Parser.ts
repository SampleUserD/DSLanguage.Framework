import * as Nodes from './Nodes/Main.js'
import * as Component from './Component.js'
import * as Types from './Types.js'
import * as Box from './Utility/Box.js'

import { PrioritizationToEnvironmentContainer, Priority } from './PrioritizationToEnvironmentContainer.js'

export class Parser<T extends Nodes.Base> 
{
  private _container: PrioritizationToEnvironmentContainer<T> = new PrioritizationToEnvironmentContainer()

  public constructor(private _cursor: Types.Cursor) {}

  public Use(priority: Priority, wrapper: Box.Base<Component.Base<T>>): void 
  {
    this._container.Add(priority, wrapper)
  }

  public Parse(): T[] 
  {
    const tree: T[] = []
    const environment = this._container.GenerateEnvironment()

    while (this._cursor.Done == false)
    {
      tree.push(environment.Parse() as T)
    }

    return tree
  }
}