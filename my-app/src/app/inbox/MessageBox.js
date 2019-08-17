import React, { useState } from 'react';

function MessageBox(props) {
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState(props.error);

  const sendMessage = () => {
    if (value) props.send(value);
  };

  return (<div className="mt-4 d-flex align-center w-100">
    <input placeholder="write something..." className="input-primary" type="text"
           onChange={(e) => setValue(e.target.value)} value={value} />
    <button className="btn-primary ml-2" onClick={sendMessage}>send</button>
    {error && <div className="text-warning"> couldnt send message, please try again or contact support</div>}
  </div>);
}

export default MessageBox;