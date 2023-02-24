import React, { useEffect, useState } from "react";
import {notification, Spin} from "antd";
import InfiniteScroller from 'react-infinite-scroller';
import networkProvider, { NetworkProvider } from "../services";
import GithubItem from "./GithubItem";
// import Loading from "./Loading";
import { PopularEnum } from "../utils/consts";
import {initialPopularLanguage, setQuery} from "../utils";

function Popular() {
  const [language, setLanguage] = useState(initialPopularLanguage());
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    networkProvider.request({ url: `${NetworkProvider.baseUrl}&q=stars:%3E1+${initialPopularLanguage()}` }).then((res) => {
      setDataSource(res.data.items);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  function onSelect(nextLanguage: string) {
    if (loading) {
      return;
    }
    setLoading(true);
    networkProvider.request({
      url: `${NetworkProvider.baseUrl}&q=stars:%3E1+${nextLanguage}`
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

  const onLoadMore = () => {
    const nextPage = page;
    setLoading(true);
    networkProvider.request({
      url: `${NetworkProvider.baseUrl}&q=stars:%3E1+${language}&page=${nextPage}`,
    }).then((res) => {
      if (res.data.items) {
        setPage(nextPage);
        setDataSource((prevDataSource) => {
          return prevDataSource.concat(res.data.items);
        });
      }
    }).catch((err) => {
      console.error(err);
      notification.open({
        message: '网络错误',
      });
      setEnd(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <React.Fragment>
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
      <InfiniteScroller
        initialLoad={false}
        loadMore={onLoadMore}
        hasMore={!loading || end}
      >
        <section
          className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center"
        >
          {
            dataSource.map((value: any, index) => {
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
      </InfiniteScroller>
    </React.Fragment>
  )
}

export default Popular;
