import React, {useState} from 'react';
import Popular from './../components/Popular';
import Battle from "../components/Battle";
import { getQuery, setHash, setQuery } from "../utils";

function Main() {
  const query = getQuery() || {};
  const initMode = query.mode || 'popular';
  const [ mode, setMode ] = useState(initMode);

  function onChangeMode(nextMode: string): void {
    if (nextMode === mode) {
      return;
    }
    setHash('');
    setQuery(`mode=${nextMode}`);
    setMode(nextMode);
  }

  return (
    <React.Fragment>
      <header className="relative">
        <span
          className={`cursor-pointer font-bold text-3xl mr-2 ${mode === 'popular' ? 'text-red-400' : ''}`}
          onClick={() => { onChangeMode('popular') }}
        >
          Popular
        </span>
        <span
          className={`cursor-pointer font-bold text-3xl ${mode === 'battle' ? 'text-red-400' : ''}`}
          onClick={() => { onChangeMode('battle') }}
        >
          Battle
        </span>
      </header>
      <section className="relative">
        { mode == 'popular' ? <Popular /> : <Battle /> }
      </section>
    </React.Fragment>
  )
}

export default Main;
