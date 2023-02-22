import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';

import Main from './pages/Main';

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<Main />);
}
