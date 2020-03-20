import React from "react";
import { Card, Button } from "semantic-ui-react";

const UserCard = ({ name }) => (
  <Card>
    <Card.Content>
      <Card.Header>{name} Test Name</Card.Header>
      <Button>Delete User</Button>
    </Card.Content>
  </Card>
);

export default UserCard;
