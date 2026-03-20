import { FC } from "react";

import { Spin } from 'antd';
import React from 'react';

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;
const Loading: FC = () => {
    return  <div className="flex items-center justify-center h-[70vh] " >
        <Spin tip="Loading" size="large">
    {content}
  </Spin>
    </div>
}

export default Loading