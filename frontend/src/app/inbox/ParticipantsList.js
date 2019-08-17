import React from 'react';
import { size } from 'lodash';

const ParticipantsList = ({ thread, classes }) => <div className={`list-container p-2 ${classes}`}>
  {
    size(thread) ? thread.map((item, index) => <div key={index}>{item.name}</div>) : <div>no users</div>
  }
</div>;


export default ParticipantsList;