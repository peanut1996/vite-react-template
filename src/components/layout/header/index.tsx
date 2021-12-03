import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Dropdown, Layout, Menu, Space } from 'supremind';

// import siteConfig from "/assets/sitemode.json";
import styles from './index.module.scss';

const { Header } = Layout;

interface CommonHeaderProps {
  collapsed: boolean;
  setCollapsed: (params: boolean) => void;
}

const CommonHeader: React.FC<CommonHeaderProps> = (props) => {
  const { collapsed, setCollapsed } = props;
  // console.log(siteConfig, "123");

  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <a target="_blank" rel="noopener noreferrer">
          登出
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className={styles.header}>
      <div className={styles.trigger} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.user}>
        <Space size={16}>
          <div className={styles.utils}>
            <SettingOutlined />
          </div>
          <Dropdown trigger={['click']} overlay={menu} placement="bottomCenter">
            <div className={styles.username}>
              <Space>
                <Avatar size="small" icon={<UserOutlined />} />
                你好
              </Space>
            </div>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default CommonHeader;
