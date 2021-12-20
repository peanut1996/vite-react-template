import './mock';
import 'moment/dist/locale/zh-cn';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import React from 'react';

import { renderRoutes, routes } from './config/routes';

moment.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      dropdownMatchSelectWidth={false}
      getPopupContainer={(node) => {
        // 解决下拉框随着滚动条的滚动会出现错位情况
        if (node?.parentElement) {
          return node.parentElement;
        }
        return document.body;
      }}
    >
      {renderRoutes(routes)}
    </ConfigProvider>
  );
};

export default App;
