export interface IHttpResponse<T = unknown> {
  statusCode: number;
  body: T | null;
  error: Error | null;
}
