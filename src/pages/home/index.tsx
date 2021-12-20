import { Alert, Button, DatePicker, Modal } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

import homeStore from './homeStore';
import styles from './index.module.scss';

const { confirm } = Modal;

const index = (props: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {homeStore.ChangeConunt}

      <Alert message="Success Text" type="success" />

      <Button onClick={homeStore.getInfo}>请求</Button>
      <Button>{`${homeStore.getLoading}`}</Button>
      <div className={styles.loginContainer}>123</div>
      <div className={styles.loginContainer}>{`${homeStore.loading}`}</div>
    </div>
  );
};

export default observer(index);
