import { IResponse } from '@/common/interfaces/commons';
import request from '@/common/request';

export function login(data: any): Promise<IResponse<any>> {
  return request({
    url: '/api/login',
    method: 'POST',
    data,
  });
}
