import { IMenuConfig } from '@/common/models/routes';

const getMenus = () => {
  const menus: IMenuConfig[] = [
    {
      name: 'home',
      path: `/main/home`,
      isShow: true,
    },
  ];
  return menus;
};

export default getMenus;
