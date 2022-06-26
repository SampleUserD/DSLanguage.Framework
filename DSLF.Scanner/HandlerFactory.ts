import { Handler } from './Handler.js'

type HandlerFactory = () => Handler

const CreateHandlerFactory = (handler: Handler): HandlerFactory => (): Handler => handler

export { HandlerFactory as Base, CreateHandlerFactory as Create }