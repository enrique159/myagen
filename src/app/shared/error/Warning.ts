import { NetworkStatusCode } from '../enums/networkStatusCode'
import { BaseError, type DataErrorType, type ErrorType } from './BaseError'

export default class Warning extends BaseError {
  readonly statusCode: NetworkStatusCode

  constructor(
    statusCode: NetworkStatusCode,
    errors?: string | string[],
    warnings?: ErrorType | ErrorType[],
    dataErrors?: DataErrorType | DataErrorType[],
  ) {
    super(errors, warnings, dataErrors)
    this.name = 'Warning'
    this.statusCode = statusCode
    Object.setPrototypeOf(this, Warning.prototype)
  }
}
