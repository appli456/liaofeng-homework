import React from 'react';
import {Card, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane, faTrophy, faUserGroup} from "@fortawesome/free-solid-svg-icons";

function BattleExplanation() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default BattleExplanation;
