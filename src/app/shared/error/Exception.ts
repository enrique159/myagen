import { NetworkStatusCode } from '../enums/networkStatusCode'
import { BaseError, type ErrorType } from './BaseError'

export default class Exception extends BaseError {
  readonly statusCode: NetworkStatusCode

  constructor(
    statusCode: NetworkStatusCode,
    errors?: string | string[],
    warnings?: ErrorType | ErrorType[],
  ) {
    super(errors, warnings)
    this.name = 'Exception'
    this.statusCode = statusCode
    Object.setPrototypeOf(this, Exception.prototype)
  }
}
