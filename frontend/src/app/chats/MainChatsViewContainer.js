import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import ChatRoomList from './chat-list/ChatList';
import CreateNewGroup from './create-new-chat/CreateNewRoom';
import { addRoom, listRooms } from '../../apiService';
import { withRouter } from 'react-router-dom';

function MainChatsViewContainer(props) {
  // declare all the state variables.
  const [data, setData] = useState({
    rooms: null,
    error: false,
  });

  const [roomName, setRoomName] = useState('');

  // effect on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const rooms = await listRooms();
        setData({
          rooms,
          error: null,
        });
      } catch (e) {
        setData({
          rooms: [],
          error: e,
        });
      }
    }

    fetchData();
  }, []);

  const join = (room) => {
    if (!room) return;

    const roomId = room.id;
    props.history.push({
      pathname: '/chat-room',
      state: { roomId },
    });
  };

  const createNewRoom = async (roomName) => {
    const { roomId } = await addRoom(roomName);

    try {
      const rooms = [...data.rooms, { name: roomName, id: roomId }];
      setData({ rooms });
    } catch (e) {
      setData({ error: e });
    }
  };

  return (
      <div className="d-flex justify-center flex-column align-center h-inherit">
        {!!size(data.rooms) &&
        <ChatRoomList join={join} loading={false} chatRoomList={data.rooms} />}
        {data.error && <div className="text-warning"> {data.error} </div>}
        <CreateNewGroup createNewRoom={createNewRoom}  value={roomName}/>
      </div>
  );

}

export default withRouter(MainChatsViewContainer);