import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationArrow,
  faUserGroup,
  faUserPlus,
  faCode,
} from '@fortawesome/free-solid-svg-icons';

import {
  Card,
  Typography,
} from 'antd';

interface BattleResultItem {
  data: any;
  title: string;
}

function BattleResultItem(props: BattleResultItem) {
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
          <FontAwesomeIcon icon={faLocationArrow} />{data.location}
        </div>
        <div>
          <FontAwesomeIcon icon={faUserGroup} /> {data.followers}
        </div>
        <div>
          <FontAwesomeIcon icon={faUserPlus} /> {data.following}
        </div>
        <div>
          <FontAwesomeIcon icon={faCode} /> {data.public_repos}
        </div>
      </Card>
    </Card>
  );
}

export default BattleResultItem;
