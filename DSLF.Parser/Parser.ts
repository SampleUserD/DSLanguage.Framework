import * as Commons from '#root/DSLF.Commons/Main'
import * as Prioritization from './Prioritization/Main.js'

import * as Nodes from './Nodes/Main.js'
import * as Component from './Component.js'
import * as DefaultTypes from './Types.js'

import { Environment } from './Environment.js'
import { PrioritizationToEnvironmentContainer } from './PrioritizationToEnvironmentContainer.js'

import Priority = Prioritization.Priority.Base

export class Parser<T extends Nodes.Base> 
{
  private _container: PrioritizationToEnvironmentContainer<T> = new PrioritizationToEnvironmentContainer()

  public constructor(private _cursor: Commons.Cursor<DefaultTypes.Token>) {}

  public Use(priority: Priority, parser: Component.Base<T>): void 
  {
    this._container.Add(priority, parser)
  }

  public Parse(): T[] 
  {
    const tree: T[] = []
    const environment: Environment<T> = this._container.GenerateEnvironment()

    while (this._cursor.Done == false)
    {
      tree.push(environment.Parse() as T)
    }

    return tree
  }
}