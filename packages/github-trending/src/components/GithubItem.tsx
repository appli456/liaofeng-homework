import React from 'react';
import { Card } from 'antd';

interface GithubItemProps {
  item: any;
}

function GithubItem(props: GithubItemProps) {
  const {
    item,
  } = props;
  return (
    <Card
      hoverable={true}
      cover={<img alt="avatar" src={item.owner.avatar_url}/>}
    >
      <Card.Meta
        title={item.name}
      />
      <div>Owner: {item.owner.login}</div>
      <div>Star: {item.stargazers_count}</div>
      <div>Fork: {item.forks_count}</div>
      <div>Issue: {item.open_issues_count}</div>
    </Card>
  );
}

export default GithubItem;
