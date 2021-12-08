import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { matchRoutes, renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { IMenuConfig, IRouteConfigExt } from '@/common/models/routes';
import getMenus from '@/config/menus';
import { createMainRoutes } from '@/config/routes';

import CommonHeader from '../header';
import styles from './index.module.scss';

const { Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

interface BaseLayoutProps extends RouteConfigComponentProps {
  route: IRouteConfigExt;
}

const MainLayout: React.FC<BaseLayoutProps> = (props) => {
  // 控制侧边栏显示、隐藏
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // layout下的路由获取
  const mainRoutes = createMainRoutes();
  const menus = getMenus();
  let currentMenus: any[] = [];
  if (mainRoutes) {
    currentMenus = matchRoutes(menus, props.location.pathname).map((item) => item.route);
  }

  const clickMenu = (value: any) => {
    console.log(value);
    props.history.push(value.key);
  };

  const renderTitle = (item: IMenuConfig) => {
    return (
      <span>
        {item.icon ? <item.icon /> : null}
        <span>{item.name}</span>
      </span>
    );
  };

  const renderMenu = (items: IMenuConfig[]) => {
    return items.map((item: IMenuConfig) => {
      if (item.isShow) {
        if (item.showChild !== false && item.routes && item.routes.length) {
          return (
            <SubMenu key={item.path} title={renderTitle(item)}>
              {renderMenu(item.routes)}
            </SubMenu>
          );
        }
        return <MenuItem key={item.path}>{renderTitle(item)}</MenuItem>;
      }
      return null;
    });
  };
  return (
    <Layout className={styles.layoutContainer}>
      <Sider className={styles.sider} collapsible collapsed={collapsed} trigger={null}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" onClick={clickMenu}>
          {renderMenu(menus)}
        </Menu>
      </Sider>
      <Layout className={styles.layout}>
        <CommonHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* <Breadcrumb menus={currentMenus} /> */}
        <Content className={styles.content}>
          <div className={styles.render}>{renderRoutes(mainRoutes)}</div>
        </Content>
        <Footer className={styles.footer}>Copyright © 2019-2020 闪马智能 沪ICP备 12020087号</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
