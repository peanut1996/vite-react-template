import { makeAutoObservable, runInAction } from 'mobx';

import { login } from '@/apis';

class HomeStore {
  constructor() {
    makeAutoObservable(this);
  }

  loading = false;

  private count = 0;

  get getLoading() {
    return !this.loading;
  }

  get ChangeConunt() {
    return this.count;
  }

  getInfo = async () => {
    this.loading = true;
    try {
      const res = await login({});
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      console.log(1);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

export default new HomeStore();
