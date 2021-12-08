export interface IResponse<T = any> {
  code: number;
  codeName?: string;
  message?: string;
  isAxiosError?: boolean;
  data?: T;
}
