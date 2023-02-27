const baseUrl = 'https://api.github.com/search/repositories?sort=stars&order=desc&type=Repositories';
const Spin = antd.Spin;
const Card = antd.Card;
const Typography = antd.Typography;
const Button = antd.Button;
const Input = antd.Input;
const notification = antd.notification;

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

function addQuery(q) {
  const query = {
    ...(formatQuery()),
    ...q,
  };

  location.search = Object.keys(query).map((key) => {
    return `${key}=${query[key]}`;
  }).join('&');
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

function initialShowResult() {
  const obj = {1: '', 2: ''}
  const query = getQuery() || {};

  if (typeof query.left === 'string') {
    obj['1'] = query.left;
  }

  if (typeof query.right === 'string') {
    obj['2'] = query.right;
  }

  return obj;
}

function BattleExplanation() {
  return (
    <React.Fragment>
      <Typography.Title>Instructions</Typography.Title>
      <div className="flex flex-row items-center justify-center">
        <Card>
          <Typography.Text>Enter two Github users</Typography.Text>
          <div style={{ width: 200 }} className="flex items-center justify-center">
            <i className="fa fa-user-group"></i>
          </div>
        </Card>
        <Card>
          <Typography.Text>Battle</Typography.Text>
          <div style={{ width: 200 }} className="flex items-center justify-center">
            <i className="fa fa-plane"></i>
          </div>
        </Card>
        <Card>
          <Typography.Text>See the winner</Typography.Text>
          <div style={{ width: 200 }} className="flex items-center justify-center">
            <i className="fa fa-trophy"></i>
          </div>
        </Card>
      </div>
    </React.Fragment>
  )
}

function BattleResultItem(props) {
  const { data, title } = props;

  return (
    <Card hoverable={true}>
      <Typography.Title>{title}</Typography.Title>
      <Card
        cover={<img src={data.avatar_url} alt={data.name} style={{ width: 200, height: 200 }}  />}
      >
        <div className="text-center">
          <Typography.Title level={3}>Scores: {data.public_repos}</Typography.Title>
          <Typography.Title level={2}>{data.name}</Typography.Title>
        </div>
        <div>
          <i className="fa fa-location-arrow" />{data.location}
        </div>
        <div>
          <i className="fa fa-user-group"></i>
          {data.followers}
        </div>
        <div>
          <i className="fa fa-user-plus"></i>
          {data.following}
        </div>
        <div>
          <i className="fa fa-code"></i>
          {data.public_repos}
        </div>
      </Card>
    </Card>
  );
}

function BattleSelector(props) {
  const {
    name,
    onClose,
    type,
  } = props;

  return (
    <div className="flex flex-1 justify-between items-center">
      <div className="flex flex-1 items-center">
        <img
          alt={name}
          src={`https://github.com/${name}.png?size=200`}
          style={{ width: 100, height: 100 }}
        />
        <span>{name}</span>
      </div>
      <i className="fa fa-x-mark fa-2xl" onClick={() => onClose(type)}></i>
    </div>
  );
}

const BattleInput = (props) => {
  const {
    defaultValue,
    onSubmit,
    type,
    title,
  } = props;

  const [value, setValue] = React.useState(defaultValue);

  const onChange = React.useCallback((e) => {
    const elementValue = e.target.value;
    setValue(elementValue);
  }, []);

  return <div className="flex flex-1 flex-col">
    <Typography.Text>{title}</Typography.Text>
    <div className="flex flex-1">
      <Input.Group compact>
        <Input
          style={{ width: 'calc(100% - 200px)' }}
          onChange={onChange}
          value={value}
          onPressEnter={() => { onSubmit(type, value) }}
        />
        <Button
          type="primary"
          onClick={() => { onSubmit(type, value) }}
        >
          Submit
        </Button>
      </Input.Group>
    </div>
  </div>
}

function Battle() {
  const hash = getHash();
  const [showResult, setShowResult] = React.useState(initialShowResult());
  const [playerData, setPlayerData] = React.useState({ 1: null , 2: null });
  React.useEffect(() => {
    const obj = initialShowResult();
    if (obj['1'] && obj['2'] && hash === 'battle-result') {
      onBattle();
    }
  }, []);

  const onSubmit = React.useCallback((type, value) => {
    if (type === 1 || type === 2) {
      setShowResult((prevResult) => {
        return {
          ...prevResult,
          [type]: value,
        };
      });
      addQuery({
        [`${type === 1 ? 'left' : 'right'}`]: value,
      });
    }
  }, []);

  function onClose(t) {
    if (t === 1 || t === 2) {
      setShowResult((prevResult) => {
        return {
          ...prevResult,
          [t]: '',
        };
      });
    }
  }

  function onBattle() {
    Promise.all([
      axios.request({
        url: `https://api.github.com/users/${showResult['1']}`
      }),
      axios.request({
        url: `https://api.github.com/users/${showResult['2']}`
      })
    ]).then((data) => {
      if (data.length === 2) {
        const left = data[0];
        const right = data[1];
        setPlayerData({
          1: left.data,
          2: right.data,
        });
        setHash('battle-result');
      }

    }).catch((err) => {
      console.error(err);
      notification.open({
        message: '网络错误',
      });
    });
  }

  function onReset() {
    setPlayerData({ '1': null, '2': null });
    setHash('battle');
    setQuery('');
  }

  const getBattleResult = React.useCallback((a, b) => {
    return a.public_repos > b.public_repos ? 'Winner' : 'Loser';
  }, []);

  return <div>
    {
      playerData['1'] && playerData['2'] ?
        (
          <div className="flex flex-1 justify-center">
            <BattleResultItem
              data={playerData['1']}
              title={getBattleResult(playerData['1'], playerData['2'])}
            />
            <BattleResultItem
              data={playerData['2']}
              title={getBattleResult(playerData['2'], playerData['1'])}
            />
          </div>
        ) : (<BattleExplanation />)
    }
    <Typography.Title>Players</Typography.Title>
    <div className="flex items-center flex-1">
      {
        showResult['1'] ?
          <BattleSelector
            name={showResult['1']}
            type={1}
            onClose={onClose}
          /> :
          (
            <BattleInput
              defaultValue=""
              title="Player One"
              onSubmit={onSubmit}
              type={1}
            />
          )
      }


      <div className="flex flex-1 items-center">
        {
          showResult['2'] ?
            <BattleSelector
              name={showResult['2']}
              type={2}
              onClose={onClose}
            /> :
            (
              <BattleInput
                defaultValue=""
                title="Player Two"
                onSubmit={onSubmit}
                type={2}
              />
            )
        }
      </div>
    </div>
    {
      playerData['1'] && playerData['2'] ? (
        <div className="flex flex-1 items-center justify-center">
          { playerData['1'] && playerData['2'] ? (
            <Button type="primary" onClick={onReset}>Reset</Button>
          ) : null }
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          { showResult['1'] && showResult['2'] ? (
            <Button type="primary" onClick={onBattle}>Battle</Button>
          ) : null }
        </div>
      )
    }
  </div>;
}

function GithubItem(props) {
  const {
    item,
    index,
  } = props;
  return (
    <Card hoverable={true}>
      <div className="font-bold text-4xl items-center justify-center flex">
        #{index}
      </div>
      <Card
        cover={<img alt="avatar" src={item.owner.avatar_url}/>}
      >
        <Card.Meta
          title={item.name}
        />
        <div>
          <i className="fa fa-user" />
          &nbsp;{item.owner.login}
        </div>
        <div>
          <i className="fa fa-star" />
          &nbsp;{item.stargazers_count}
        </div>
        <div>
          <i className="fa fa-code-fork"/>
          &nbsp;{item.forks_count}
        </div>
        <div>
          <i className="fa fa-triangle-exclamation" />
          &nbsp;{item.open_issues_count}
        </div>
      </Card>
    </Card>
  );
}

function Popular() {
  const [language, setLanguage] = React.useState(initialPopularLanguage());
  const [dataSource, setDataSource] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [end, setEnd] = React.useState(false);

  React.useEffect(() => {
    axios.request({
      url: `${baseUrl}&q=stars:%3E1+${initialPopularLanguage()}`,
      method: 'GET',
      responseType: 'json',
    }).then((res) => {
      setDataSource(res.data.items);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  function onSelect(nextLanguage) {
    if (loading) {
      return;
    }
    setLoading(true);
    axios.request({
      url: `${baseUrl}&q=stars:%3E1+${nextLanguage}`
    }).then((res) => {
      if (res.data.items) {
        setLanguage(nextLanguage);
        setPage(1);
        setDataSource(res.data.items);
        setQuery(`language=${nextLanguage.toLowerCase()}`);
      }
    }).catch((err) => {
      console.error(err);
      notification.open({
        message: '网络错误',
      });
    }).finally(() => {
      setLoading(false);
      setEnd(false);
    });
  }

  return <React.Fragment>
    <section className="relative">
      <div className="flex flex-1 items-center justify-center flex-row">
          <span
            onClick={() => {
              onSelect(PopularEnum.all);
            }}
            className={`mr-2 font-bold text-xl cursor-pointer ${language === PopularEnum.all ? 'text-red-400' : ''}`}
          >
            All
          </span>
        <span
          onClick={() => {
            onSelect(PopularEnum.javascript);
          }}
          className={`mr-2 font-bold text-xl cursor-pointer ${language === PopularEnum.javascript ? 'text-red-400' : ''}`}
        >
            JavaScript
          </span>
        <span
          onClick={() => {
            onSelect(PopularEnum.ruby);
          }}
          className={`mr-2 font-bold text-xl cursor-pointer ${language === PopularEnum.ruby ? 'text-red-400' : ''}`}
        >
            Ruby
          </span>
        <span
          onClick={() => {
            onSelect(PopularEnum.java);
          }}
          className={`mr-2 font-bold text-xl cursor-pointer ${language === PopularEnum.java ? 'text-red-400' : ''}`}
        >
            Java
          </span>
        <span
          onClick={() => {
            onSelect(PopularEnum.css);
          }}
          className={`mr-2 font-bold text-xl cursor-pointer ${language === PopularEnum.css ? 'text-red-400' : ''}`}
        >
            CSS
          </span>
        <span
          onClick={() => {
            onSelect(PopularEnum.python);
          }}
          className={`font-bold text-xl cursor-pointer ${language === PopularEnum.python ? 'text-red-400' : ''}`}
        >
            Python
          </span>
      </div>
    </section>

      <section
        className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center"
      >
        {
          dataSource.map((value, index) => {
            return (
              <GithubItem
                index={index + 1}
                item={value}
                key={`github-item-${value.id}`}
              />
            )
          })
        }
      </section>
      <Spin />
  </React.Fragment>;
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
