type RequestPromise<Data> = Promise<Data>;
type RequestConfig = {
  method: "get" | "post" | "post" | "put" | "patch";
  data?: any;
  headers?: string[][];
};

export type { RequestPromise, RequestConfig };
