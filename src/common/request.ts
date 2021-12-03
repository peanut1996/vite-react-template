import 'nprogress/nprogress.css';

import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import NProgress from 'nprogress';
import { IResponse } from 'supremind';
import URI from 'urijs';

import { trimBlankToUndefined } from './utils';

const service = axios.create({
  timeout: 10000,
  withCredentials: true,
});

/**
 * 设置post请求头
 * application/json;charset=UTF-8   JSON格式
 * application/x-www-form-urlencoded;charset=UTF-8  Form表单格式
 */
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const httpCode = {
  // 这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时',
};

/** 添加请求拦截器 * */
service.interceptors.request.use(
  (config) => {
    // 添加进度条（开始）
    NProgress.start();
    config.headers.token = sessionStorage.getItem('token') || '';
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

/** 添加响应拦截器  * */
service.interceptors.response.use(
  (response) => {
    // 进度条结束
    NProgress.done();
    if (response.statusText === 'OK') {
      // 响应结果里的statusText: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
      return Promise.resolve(response);
    }
    message.error('响应超时');
    return Promise.reject(response.data.message);
  },
  (error) => {
    // 进度条结束
    NProgress.done();
    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      const tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message;
      message.error(tips);
      if (error.response.status === 401) {
        // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
        // 针对框架跳转到登陆页面
      }
      return Promise.reject(error);
    }
    message.error('请求超时, 请刷新重试');
    return Promise.reject(new Error('请求超时, 请刷新重试'));
  },
);

export interface RequestConfig extends AxiosRequestConfig {
  useCache?: boolean;
}

export function addUrlQuery(config: RequestConfig) {
  config.params = trimBlankToUndefined(config.params);
  config.data = trimBlankToUndefined(config.data);

  let uri = URI(config.url);
  if (config.params) {
    for (const p of Object.keys(config.params)) {
      if (p && config.params[p] !== undefined) {
        const para = {};
        para[p] = config.params[p];
        uri.addQuery(para);
      }
    }
    delete config.params;
  }

  if (!config.useCache && !config.params?.useCache) {
    uri = uri.addQuery({ __timestamp__: Date.now() });
  }

  config.url = uri.readable();
}

const request = (config: AxiosRequestConfig, useMock = false) => {
  return new Promise<IResponse<any>>((resolve, reject) => {
    // 解决 ie11 ajax 缓存问题
    if (!config.method || config.method.toUpperCase() === 'GET') {
      addUrlQuery(config);
    }

    service(config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default request;
