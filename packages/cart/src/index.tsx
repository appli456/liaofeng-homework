import React from 'react';
import { createRoot } from "react-dom/client";
import Cart from './pages/cart';
import './styles/index.scss';

function App() {
  return <Cart />;
}

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
