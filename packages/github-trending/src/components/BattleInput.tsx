import React, {useCallback, useState} from 'react';
import {Button, Input, Typography} from "antd";

interface BattleInputProps {
  defaultValue: string;
  onSubmit: <T extends number>(type: T, value: string) => void;
  type: number;

  title: string;
}

const BattleInput: React.FC<BattleInputProps> = (props) => {
  const {
    defaultValue,
    onSubmit,
    type,
    title,
  } = props;

  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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

export default React.memo(BattleInput);
