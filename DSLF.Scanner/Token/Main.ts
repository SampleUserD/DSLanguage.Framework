import * as Types from "./Types.js";
import * as Information from "./Information.js";

import type { Value } from "./Value.js"

type Token = { type: Types.Basic, value: Value, information?: Information.Base  }

const CreateToken = (type: Types.Basic, value: Value, information?: Information.Base) => ({ type, value, information })

export { Types, Value, Information, CreateToken as Create, Token as Base }