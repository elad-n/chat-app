import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import MainChatsViewContainer from './chats/MainChatsViewContainer';
import InboxContainer from './inbox/InboxContainer';

class ChatRoomContainer extends Component {
  render() {
    return (
        <div className="main-container d-flex flex-column justify-between">
          <Header classes="main-header text-left" headerText="chat app application" />
          <Router>
            <Switch>
              <Redirect exact from="/" to="chat-config" />
              <Route path="/chat-config" component={MainChatsViewContainer} />
              <Route path="/chat-room" component={InboxContainer} />
            </Switch>
          </Router>
          <Footer classes="main-footer text-left" headerText="create by Elad Notti for Lumigo" />
        </div>
    );
  }
}

export default ChatRoomContainer;