import React from 'react';
import { Spin } from 'antd';

function Loading () {
  return (
    <div
      className="fixed w-full h-full flex items-center justify-center z-30 top-0 left-0"
      style={{
        background: 'rgba(0, 0, 0, 0.2)',
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export default Loading;
