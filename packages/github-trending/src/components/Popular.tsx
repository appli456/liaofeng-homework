import React, {useEffect, useState} from "react";
import networkProvider, { NetworkProvider } from "../services";
import GithubItem from "./GithubItem";
import Loading from "./Loading";
import { PopularEnum } from "../utils/consts";
import { initialPopularLanguage, setHash } from "../utils";

function Popular() {
  const [language, setLanguage] = useState(initialPopularLanguage());
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    networkProvider.request({ url: `${NetworkProvider.baseUrl}&q=stars:%3E1+${initialPopularLanguage()}` }).then((res) => {
      setDataSource(res.data.items);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  function onSelect(nextLanguage: string) {
    setLoading(true);
    setHash(nextLanguage);
    networkProvider.request({
      url: `${NetworkProvider.baseUrl}&q=stars:%3E1+${nextLanguage}`
    }).then((res) => {
      if (res.data.items) {
        setLanguage(nextLanguage);
        setDataSource(res.data.items);
      }
    }).finally(() => {
      setLoading(false);
    });
  }

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
      <section
        className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
      { loading ? <Loading /> : null }
    </React.Fragment>
  )
}

export default Popular;
