import * as Component from './Component.js'
import * as Prioritizations from './Prioritization/Main.js'

import { Environment } from './Environment.js'
import { Toolkit } from './Toolkit.js'

import Priority = Prioritizations.Priority
import Prioritization = Prioritizations.Base

/**
 * @description
 * This class exists, because if connect environments by property Successor directly
 * You can not redo this chain
 * This allows you regenerate 
 */
export class PrioritizationToEnvironmentContainer<T>
{
  private _prioritizations: Prioritization<T> = {}
  private _minimalPriority: Priority.Base = Priority.Default()

  public constructor(private _toolkit: Toolkit) {}

  private UpdateMinimalPriorityIfItPossible(priority: Priority.Base): void 
  {
    if (priority - this._minimalPriority > 1)
      throw new Error(`Too big difference between passed priority and last maximal: ${ priority - this._minimalPriority } > 1`)

    if (priority > this._minimalPriority)
      this._minimalPriority = priority
  }

  private CreateEmptyContainerIfNotExist(priority: Priority.Base): void 
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

    this.CreateEmptyContainerIfNotExist(priority)
    this.UpdateMinimalPriorityIfItPossible(priority)

    this._prioritizations[priority].push(parser)
  }

  public GenerateEnvironment(): Environment<T>
  {
    let currentEnvironment: Environment<T> = new Environment<T>([], this._toolkit)

    for (let index = 0; index <= this._minimalPriority; index++)
    {
      const previousEnvironment = currentEnvironment

      currentEnvironment = new Environment<T>(this._prioritizations[index], this._toolkit)
      currentEnvironment.Successor = previousEnvironment
    }

    return currentEnvironment
  }
}