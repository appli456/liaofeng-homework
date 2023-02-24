import React from 'react';
import { createRoot } from "react-dom/client";
import './styles/index.scss';

function App() {
  return null;
}

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
