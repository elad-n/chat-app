import React from 'react';
import { size } from 'lodash';

const ListItem = ({ onClick, item }) => {
  const onClickItem = () => onClick(item);

  return (<div className="list-item" role="presentation" onClick={onClickItem}>{item.name}</div>);
};

function ChatRoomList({ chatRoomList, join }) {
  return (
      <div className="w-50 m-2">
        <div className="header-secondary">click to enter a chat room</div>
        <div className="mt-4 list-container">
          {
            !!size(chatRoomList) ?
                chatRoomList.map((chatRoom, index) => (
                    <ListItem key={index} onClick={() => join(chatRoom)} item={chatRoom} />
                )) : (<div> no chat rooms available </div>)
          }
        </div>
      </div>
  );
}

export default ChatRoomList;