import * as Priority from "./Priority.js"
import * as Components from '../Component.js'

export type Prioritization<T> = { [priority: Priority.Base]: Components.Base<T>[] }
