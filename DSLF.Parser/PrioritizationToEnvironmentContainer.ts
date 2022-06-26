import * as Component from './Component.js'
import * as Prioritizations from './Prioritization/Main.js'

import { Environment } from './Environment.js'

import Priority = Prioritizations.Priority
import Prioritization = Prioritizations.Base

/**
 * @description
 * This class prevents unexpected mutation of successor of environment-objects by parser
 * By saving it as prioritization-object and late-binding of them
 */
export class PrioritizationToEnvironmentContainer<T>
{
  private _prioritizations: Prioritization<T> = {}
  private _minimalPriority: Priority.Base = Priority.Default()

  private TryUpdateMinimalPriority(priority: Priority.Base): void 
  { 
    if (priority > this._minimalPriority)
      this._minimalPriority = priority
  }

  private TryCreateEmptyContainer(priority: Priority.Base): void 
  {
    if (this.Exists(priority) == false)
      this._prioritizations[priority] = []
  }

  public Exists(priority: Priority.Base): boolean
  {
    return priority in this._prioritizations == true
  }

  public Add(priority: Priority.Base, parser: Component.Base<T>): void 
  {
    Priority.AssertValidation(priority)

    this.TryCreateEmptyContainer(priority)
    this.TryUpdateMinimalPriority(priority)

    this._prioritizations[priority].push(parser)
  }

  public GenerateEnvironment(): Environment<T>
  {
    let currentEnvironment: Environment<T> = new Environment<T>([])

    for (let index = Priority.Default(); index <= this._minimalPriority; index++)
    {
      if (index in this._prioritizations == false)
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