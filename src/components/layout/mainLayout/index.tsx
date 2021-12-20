import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { IMenuConfig } from '@/common/models/routes';
import getMenus from '@/config/menus';

import CommonHeader from '../header';
import styles from './index.module.scss';

const { Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

const MainLayout: React.FC = () => {
  // 控制侧边栏显示、隐藏
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const menus = getMenus();

  const clickMenu = (value: any) => {
    navigate(value.key);
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
          <div className={styles.render}>
            <Outlet />
          </div>
        </Content>
        <Footer className={styles.footer}>Copyright © 2019-2020 闪马智能 沪ICP备 12020087号</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
