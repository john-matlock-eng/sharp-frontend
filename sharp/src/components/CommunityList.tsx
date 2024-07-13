import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const CommunityList: React.FC = () => {
  const communities = ["Community 1", "Community 2", "Community 3"]; // Replace with data from your backend

  return (
    <List>
      {communities.map((community, index) => (
        <ListItem key={index}>
          <ListItemText primary={community} />
        </ListItem>
      ))}
    </List>
  );
};

export default CommunityList;
