import React, {useCallback, useEffect, useState} from 'react';
import { Typography, Button, notification } from 'antd';
import BattleInput from "./BattleInput";
import BattleSelector from "./BattleSelector";
import BattleExplanation from "./BattleExplanation";
import networkProvider from "../services";
import BattleResultItem from "./BattleResultItem";
import {addQuery, getHash, initialShowResult, setHash, setQuery} from "../utils";

function Battle() {
  const hash = getHash();
  const [showResult, setShowResult] = useState(initialShowResult());
  const [playerData, setPlayerData] = useState({ 1: null as any, 2: null as any });

  useEffect(() => {
    const obj = initialShowResult();
    if (obj['1'] && obj['2'] && hash === 'battle-result') {
      onBattle();
    }
  }, [])

  const onSubmit = useCallback((type: number, value: string): void => {
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

  function onClose(t: number) {
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
      networkProvider.request({
        url: `https://api.github.com/users/${showResult['1']}`
      }),
      networkProvider.request({
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

  const getBattleResult = useCallback((a: any, b: any): string => {
    return a.public_repos > b.public_repos ? 'Winner' : 'Loser';
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default Battle;
