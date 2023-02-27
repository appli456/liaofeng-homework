import React from 'react';
import { createRoot } from "react-dom/client";
import {
  RecoilRoot
} from 'recoil';

import Cart from './pages/Cart';
import 'antd/dist/reset.css';
import './styles/index.scss';

function App() {
  return (
    <RecoilRoot>
      <React.Suspense>
        <Cart />
      </React.Suspense>
    </RecoilRoot>
  );
}

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
