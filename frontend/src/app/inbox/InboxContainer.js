import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { size, get } from 'lodash';
import ParticipantsList from './ParticipantsList';
import Thread from './Thread';
import MessageBox from './MessageBox';

import { getRoomUsers, joinRoom, getRoomTextThread, sendMessageReq } from '../../apiService';

function InboxContainer(props) {
  const [data, setData] = useState({
    roomId: null,
    users: [],
    thread: [],
    roomTitle: null,
  });
  const [userId, setUserId] = useState(0);
  const [userName, serUserName] = useState('lumigo');
  const [inputValue , setInputValue] = useState('');
  const [error, setError] = useState(false);
  useEffect(() => {
    const roomId = get(props, 'location.state.roomId');

    async function fetchData() {

      const results = await Promise.all([joinRoom(roomId), getRoomUsers(roomId), getRoomTextThread(roomId)]);

      const roomName = results[0].name || 'N/A';
      const { users } = results[1].users;
      const thread = results[2].text.map(messageItem => deserializeTxtToUi(messageItem, users));

      setData({
        roomId,
        users,
        thread,
        roomName,
      });
    }

    fetchData();
  }, []);

  const returnToMainScreen = () => {
    props.history.push('/chat-config');
  };

  const send = async (message) => {
    const roomId = data.roomId;
    const res = await sendMessageReq(roomId, userId, message);
    try {
      // set message to thread.
      const messageToUi = deserializeTxtToUi({ text: message, id: userId }, data.users);
      const newThread = [...data.thread, messageToUi];

      setData({ ...data, thread: newThread });
      // reset value input.
      setInputValue('');
    } catch (e) {
      console.log('e ', e);
      setError(e);
    }
  };

  // change user id to display name.
  const deserializeTxtToUi = (message, users) => {
    if (!message) return [];

    if (!size(users)) {
      return { ...message, sentBy: userName };
    } else {

      // to fix . move it out...
      const usersMapObj = new Map(users.map(user => [user.id, user.name]));
      return { ...message, sentBy: (usersMapObj.get(message.userId) || 'N/A') };
    }
  };

  return (
      <div className="d-flex flex-column align-center justify-center h-inherit">

        <div className="d-flex flex-column p-4 box-component no-bb w-50">
          <div className="header-secondary mb-4"> welcome to {data.roomName} chat room</div>
          <div className="d-flex">
            <ParticipantsList classes="w-20 thin-box-component" list={data.users} />
            <Thread classes='w-80' thread={data.thread} />
          </div>
        </div>

        <div className="w-50 box-component d-flex align-center justify-center p-4 flex-column">
          <MessageBox value={inputValue} roomId={data.roomId} send={send} error={error} />
          <button className="btn-primary mt-4" onClick={returnToMainScreen}> return to main screen</button>
        </div>
      </div>
  );
}

export default withRouter(InboxContainer);