import { NextApiRequest } from "next";

export type HTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRequestType<
  TMethod extends HTTPMethods,
  TReq extends Record<string, any> | null
> = Omit<NextApiRequest, "body" | "method"> & { body: TReq; method: TMethod };

export type ApiEndpointType<
  TMethod extends HTTPMethods,
  TReq extends Record<string, any> | null,
  TRes extends Record<string, any>
> = {
  request: ApiRequestType<TMethod, TReq>;
  response: TRes;
};

export type ApiRequestBodyFromEndpoint<
  T extends ApiEndpointType<
    HTTPMethods,
    Record<string, any> | null,
    Record<string, any>
  >
> = T["request"]["body"];

export type ApiResponseBodyFromEndpoint<
  T extends ApiEndpointType<
    HTTPMethods,
    Record<string, any> | null,
    Record<string, any>
  >
> = T["response"];