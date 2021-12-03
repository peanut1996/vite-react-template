import React from 'react';

const LayoutLoading = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="/src/assets/loading.jpg" alt="" style={{ maxWidth: '25%', maxHeight: '25%' }} />
    </div>
  );
};

export default LayoutLoading;
