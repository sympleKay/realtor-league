export interface TServiceResponse<T> {
  status: boolean
  message: string
  data?: T | null
}
