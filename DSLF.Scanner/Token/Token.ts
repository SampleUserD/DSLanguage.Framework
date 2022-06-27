import * as Types from './Types/Main.js'
import * as Information from './Information/Main.js'

import Placement = Information.Defaults.Placement

export type Value = string 

export type Token = { 
  type: Types.Base, 
  value: Value, 
  placement?: Placement  
}

export const Create = (type: Types.Base, value: Value, placement?: Placement): Token => ({ type, value, placement })