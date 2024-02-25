import { IHttpResponse } from "@/presentation/protocols";

export interface IMiddleware<T = any> {
  execute: (request: T) => Promise<IHttpResponse<Record<string, unknown>>>;
}
