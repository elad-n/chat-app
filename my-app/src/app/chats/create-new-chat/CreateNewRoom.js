import React, { useState, useEffect } from 'react';

function CreateNewRoom(props) {
  const [roomName, setRoomName] = useState(props.value);
  const [emptyNameError, setEmptyNameError] = useState(false);

  useEffect(() => {
    setRoomName(props.value);
  }, []);

  const createNewRoom = () => {
    if (roomName.trim() !== '') {
      props.createNewRoom(roomName);
    } else {
      setEmptyNameError(true);
    }
  };

  return (<div className="w-50 box-component d-flex flex-column align-center justify-center p-4">
    <div>Create new chat room</div>
    <div className="mt-2 w-100 d-flex align-center justify-center">
      <input placeholder="type group name..." className="input-primary" type="text" value={roomName}
             onChange={(e) => setRoomName(e.target.value)} />
      <button className="btn-primary ml-2" onClick={createNewRoom}>create</button>
    </div>
    {emptyNameError && <div className="text-warning">must have a name to create a new group </div>}
  </div>);
}

export default CreateNewRoom;