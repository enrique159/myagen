export type DataErrorType = {
  [key: string]: {
    [key: string]: string
  }
}

export type ErrorType = {
  code: string
  category: number
  msg: string
  description: string
}

export abstract class BaseError extends Error {
  readonly errors: string[]
  readonly warnings: ErrorType[]
  readonly dataErrors: DataErrorType[]

  constructor(
    errors: string | string[] = [],
    warnings: ErrorType | ErrorType[] = [],
    dataErrors: DataErrorType | DataErrorType[] = [],
  ) {
    super()
    this.errors = Array.isArray(errors) ? errors : [errors]
    this.warnings = Array.isArray(warnings) ? warnings : [warnings]
    this.dataErrors = Array.isArray(dataErrors) ? dataErrors : [dataErrors]
  }
}
