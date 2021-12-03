import { IResponse } from 'supremind';

import request from '@/common/request';

export function login(params: any): Promise<IResponse<any>> {
  return request({
    url: '/api/login',
    method: 'POST',
    // params,
  });
}

export function ssss() {
  return request({
    url: '/getList/file',
    method: 'get',
  });
}
