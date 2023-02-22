import React, { useState, useEffect } from 'react';
import networkProvider from '../services';
import GithubItem from '../components/GithubItem';

function Main() {
  const [language, setLanguage] = useState('');
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    networkProvider.request().then((res) => {
      setDataSource(res.data.items);
      console.log(res.data.items);
    });
  }, []);
  return (
    <React.Fragment>
      <header></header>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        }}
      >
        {
          dataSource.map((value: any, index) => {
            return (
              <GithubItem
                item={value}
                key={`github-item-${value.id}`}
              />
            )
          })
        }
      </section>
    </React.Fragment>
  )
}

export default Main;
