import { RouteProps } from 'react-router-dom';

export interface IMenuConfig {
  name: string;
  path: string;
  icon?: any;
  isShow?: boolean;
  showChild?: boolean;
  routes?: IMenuConfig[];
  permission?: string;
}
