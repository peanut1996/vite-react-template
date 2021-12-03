import { RouteConfig } from 'react-router-config';
import { RouteProps } from 'react-router-dom';

export interface IMenuConfig {
  name: string;
  path: string;
  isShow?: boolean;
  icon?: any;
  showChild?: boolean;
  routes?: IMenuConfig[];
  screenUrl?: string;
  permission?: string;
  productId?: number;
  SecondaryId?: string;
  statistics?: boolean; // 判断是否是统计页面
}

export interface IRouteConfigExt extends RouteConfig {
  name: string;
  routes?: IRouteConfigExt[];
  component: RouteProps['component'];
  permission?: string;
}
