import React from 'react';
import { faUserGroup, faPlane, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Card, Input, Button } from 'antd';

function Battle() {

  return (
    <div>
      <Typography.Title>Instructions</Typography.Title>
      <div className="flex flex-row items-center justify-center">
        <Card>
          <Typography.Text>Enter two Github users</Typography.Text>
          <div style={{ width: 200 }} className="flex items-center justify-center">
            <FontAwesomeIcon icon={faUserGroup} />
          </div>
        </Card>
        <Card>
          <Typography.Text>Battle</Typography.Text>
          <div style={{ width: 200 }} className="flex items-center justify-center">
            <FontAwesomeIcon icon={faPlane} />
          </div>
        </Card>
        <Card>
          <Typography.Text>See the winner</Typography.Text>
          <div style={{ width: 200 }} className="flex items-center justify-center">
            <FontAwesomeIcon icon={faTrophy} />
          </div>
        </Card>
      </div>
      <Typography.Title>Players</Typography.Title>
      <div className="flex items-center">
        <div>
          <Typography.Text>Player One</Typography.Text>
          <Input.Group compact>
            <Input style={{ width: '100px' }} />
            <Button type="primary">Submit</Button>
          </Input.Group>
        </div>

        <div>
          <Typography.Text>Player Two</Typography.Text>
          <Input.Group compact>
            <Input style={{ width: '100px' }} />
            <Button type="primary">Submit</Button>
          </Input.Group>
        </div>
      </div>
    </div>
  );
}

export default Battle;
