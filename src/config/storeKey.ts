import _ from 'lodash';
import store from 'store2';

interface StoreKey {
  userInfo: string;
}

const namespace = 'app';

const storeKey: StoreKey = {
  userInfo: `${namespace}/userInfo`,
};

export function clearAllStore(): void {
  Object.keys(storeKey).forEach((key: string) => {
    if (!_.startsWith(key, 'g_')) {
      store.remove(storeKey[key]);
    }
  });
}

export default storeKey;
