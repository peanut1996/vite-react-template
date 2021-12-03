import React from 'react';

import { IRouteConfigExt } from '@/common/models/routes';
import MainLayout from '@/components/layout/mainLayout';
import LayoutLoading from '@/components/layoutLoading';
import Home from '@/pages/home';
import Login from '@/pages/login';

export const layoutRoutes: IRouteConfigExt[] = [
  {
    name: '登录',
    path: `/`,
    exact: true,
    component: (props: any) => (
      <React.Suspense fallback={<LayoutLoading />}>
        <Login {...props} />
      </React.Suspense>
    ),
  },
  {
    name: '管理页面布局',
    path: `/main`,
    component: (props: any) => (
      <React.Suspense fallback={<LayoutLoading />}>
        <MainLayout {...props} />
      </React.Suspense>
    ),
  },
];

export const createMainRoutes = () => {
  const routes: IRouteConfigExt[] = [
    {
      name: 'home',
      path: `/main/home`,
      component: (props: any) => (
        <React.Suspense fallback={<LayoutLoading />}>
          <Home {...props} />
        </React.Suspense>
      ),
    },
  ];
  return routes;
};
