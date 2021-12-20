import _ from 'lodash';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '@/components/layout/mainLayout';
import LayoutLoading from '@/components/layoutLoading';
import About from '@/pages/about';
import Home from '@/pages/home';
import Login from '@/pages/login';
import NotFound from '@/pages/notFound';

const mapRoute = (routes: any) => {
  return _.map(routes, (routeItem) => {
    const { path, index, element, children } = routeItem;
    return (
      <Route key={path} index={index} path={path} element={element}>
        {children && mapRoute(children)}
      </Route>
    );
  });
};

/**
 * 创建routes的函数，遍历创建Route，可根据自己需求添加权限等内容
 * @param routes
 * @returns
 */
export const renderRoutes = (routes: any[]) => {
  return (
    <Routes>
      {mapRoute(routes)}
      {/* 未找到 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export const routes: any[] = [
  {
    name: '登录',
    path: `/`,
    index: true, // 表示是否是主路由，如果设置为 true 的话不能有 children
    element: (
      <React.Suspense fallback={<LayoutLoading />}>
        <Login />
      </React.Suspense>
    ),
  },
  {
    name: '管理页面布局',
    path: `main/*`,
    element: (
      <React.Suspense fallback={<LayoutLoading />}>
        <MainLayout />
      </React.Suspense>
    ),
    children: [
      {
        name: 'home',
        path: `home`,
        element: (
          <React.Suspense fallback={<LayoutLoading />}>
            <Home />
          </React.Suspense>
        ),
      },
      {
        name: 'about',
        path: `about`,
        element: (
          <React.Suspense fallback={<LayoutLoading />}>
            <About />
          </React.Suspense>
        ),
      },
    ],
  },
];
