import { IMenuConfig } from '@/common/models/routes';

const getMenus = () => {
  const menus: IMenuConfig[] = [
    {
      name: 'home',
      path: `/main/home`,
      isShow: true,
      showChild: false,
    },
    {
      name: 'about',
      path: `/main/about`,
      isShow: true,
      showChild: false,
    },
  ];
  return menus;
};

export default getMenus;
