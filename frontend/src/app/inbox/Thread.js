import React from 'react';
import { size } from 'lodash';

const Thread = ({ thread, classes }) => (<div className={`d-flex flex-column list-container p-2 text-left ${classes}`}>
  {
    !!size(thread) ? thread.map((message, index) => <div className="thread-message" key={index}>
          <span>{message.sentBy}: {message.text}</span>
        </div>) :
        <div> no messages </div>
  }
</div>);

export default Thread;