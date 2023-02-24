const baseUrl = 'https://api.github.com/search/repositories?sort=stars&order=desc&type=Repositories';

const PopularEnum = {
  javascript: 'javascript',
  all: '',
  python: 'python',
  ruby: 'ruby',
  java: 'java',
  css: 'css',
}

function formatQuery() {
  const query = location.search.replace('?', '').split('&');
  const obj = {};

  for (let i = 0; i < query.length; ++i) {
    const item = query[i].split('=');
    if (item.length === 2) {
      obj[item[0]] = item[1];
    }
  }

  return obj;
}

function getHash() {
  return (location.hash).replace('#', '');
}

function setHash(hash) {
  location.hash = `#${hash}`;
}

function getQuery() {
  return formatQuery();
}

function setQuery(query) {
  location.search = `?${query}`;
}

function initialPopularLanguage() {
  const query = getQuery();
  if (query) {
    const language = typeof query.language === 'string' ? query.language.toLowerCase() : 'all';

    if (Object.prototype.hasOwnProperty.call(PopularEnum, language)) {
      return PopularEnum[language];
    }
  }

  return PopularEnum.all;
}

function Popular() {
  const [language, setLanguage] = React.useState(initialPopularLanguage());
  const [dataSource, setDataSource] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [end, setEnd] = React.useState(false);

  React.useEffect(() => {
    axios.request({ url: `${baseUrl}&q=stars:%3E1+${initialPopularLanguage()}` }).then((res) => {
      setDataSource(res.data.items);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return null;
}

function Battle() {
  return null;
}

function App() {
  const hash = getHash();
  const initMode = (hash === 'popular' || hash === 'battle' || hash === 'battle-result') ? hash : 'popular';
  const [ mode, setMode ] = React.useState(initMode);

  function onChangeMode(nextMode) {
    if (nextMode === mode) {
      return;
    }
    setHash(nextMode);
    setQuery('');
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
          className={`cursor-pointer font-bold text-3xl ${(mode === 'battle' || mode === 'battle-result') ? 'text-red-400' : ''}`}
          onClick={() => { onChangeMode('battle') }}
        >
          Battle
        </span>
      </header>
      <section className="relative">
        { mode == 'popular' ? <Popular /> : <Battle /> }
      </section>
    </React.Fragment>
  );
}

const domNode = document.getElementById('root');
if (domNode) {
  const root = ReactDOM.createRoot(domNode);
  root.render(<App />);
}
