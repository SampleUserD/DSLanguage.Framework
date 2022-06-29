import * as Component from './Component.js'
import * as Box from './Utility/Box.js'

import { Environment } from './Environment.js'

export type Priority = number
export type Prioritization<T> = { [priority: number]: Box.Base<Component.Base<T>>[] }

/**
 * @description
 * This class prevents unexpected and unobvious mutation of successor of environment-objects by parser.
 * by saving it as prioritization-object and late-binding of them
 */
export class PrioritizationToEnvironmentContainer<T>
{
  private _prioritizations: Prioritization<T> = {}
  private _priorities: Priority[] = []

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

    this._prioritizations[priority].push(parser)
    this._priorities.push(priority)
  }

  public GenerateEnvironment(): Environment<T>
  {
    let currentEnvironment = new Environment<T>(this._prioritizations[this._priorities[0] || 0] || [])
    let topEnvironment = new Environment<T>(this._prioritizations[this._priorities[this._priorities.length - 1] || 0] || [])

    for (let index = 1; index < this._priorities.length - 1; index++)
    {
      const previousEnvironment = currentEnvironment

      currentEnvironment = new Environment<T>(this._prioritizations[this._priorities[index]])

      currentEnvironment.Successor = previousEnvironment
      currentEnvironment.Top = topEnvironment
    }

    topEnvironment.Successor = currentEnvironment

    return topEnvironment
  }
}