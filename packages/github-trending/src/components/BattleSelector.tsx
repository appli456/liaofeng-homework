import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface BattleSelectorProps {
  name: string;
  onClose: (t: number) => void;
  type: number;
}

function BattleSelector(props: BattleSelectorProps) {
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
      <FontAwesomeIcon
        icon={faXmark}
        size="2xl"
        onClick={() => onClose(type)}
      />
    </div>
  );
}

export default BattleSelector;
