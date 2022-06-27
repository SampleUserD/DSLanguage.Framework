import * as Component from './Component.js'
import * as Box from './Utility/Box.js'

import { Environment } from './Environment.js'

export type Priority = number
export type Prioritization<T> = { [priority: Priority]: Box.Base<Component.Base<T>>[] }

/**
 * @description
 * This class prevents unexpected mutation of successor of environment-objects by parser
 * by saving it as prioritization-object and late-binding of them
 */
export class PrioritizationToEnvironmentContainer<T>
{
  private _prioritizations: Prioritization<T> = {}
  private _minimalPriority: Priority = 0

  private TryUpdateMinimalPriority(priority: Priority): void 
  { 
    if (priority > this._minimalPriority)
      this._minimalPriority = priority
  }

  private TryCreateEmptyContainer(priority: Priority): void 
  {
    if (this.Exists(priority) == false)
      this._prioritizations[priority] = []
  }

  public Exists(priority: Priority): boolean
  {
    return priority in this._prioritizations == true
  }

  public Add(priority: Priority, parser: Box.Base<Component.Base<T>>): void 
  {
    if (priority < 0)
      throw new Error(`Priority can not be less than zero: ${ priority } < 0`)

    this.TryCreateEmptyContainer(priority)
    this.TryUpdateMinimalPriority(priority)

    this._prioritizations[priority].push(parser)
  }

  public GenerateEnvironment(): Environment<T>
  {
    let currentEnvironment: Environment<T> = new Environment<T>([])

    for (let index = 0; index <= this._minimalPriority; index++)
    {
      if (this.Exists(index) == false)
      {
        continue
      }

      const previousEnvironment = currentEnvironment

      currentEnvironment = new Environment<T>(this._prioritizations[index])
      currentEnvironment.Successor = previousEnvironment
    }

    return currentEnvironment
  }
}