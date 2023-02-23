import React from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faStar,
  faCodeFork,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'


interface GithubItemProps {
  item: any;
  index: number;
}

function GithubItem(props: GithubItemProps) {
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
          <FontAwesomeIcon icon={faUser} />
          &nbsp;{item.owner.login}
        </div>
        <div>
          <FontAwesomeIcon icon={faStar} />
          &nbsp;{item.stargazers_count}
        </div>
        <div>
          <FontAwesomeIcon icon={faCodeFork} />
          &nbsp;{item.forks_count}
        </div>
        <div>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          &nbsp;{item.open_issues_count}
        </div>
      </Card>
    </Card>
  );
}

export default GithubItem;
