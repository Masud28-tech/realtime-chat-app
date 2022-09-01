import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { getAllUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    async function checkForUser() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    };
    checkForUser();
  }, []);

  useEffect(() => {
    async function fetchContactsFromCurrentUser() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${getAllUsersRoute}/${currentUser._id}`);
          setContacts(data);
        } else {
          navigate('/setAvatar');
        }
      }
    };
    fetchContactsFromCurrentUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts.data} currentUser={currentUser} chatChange={handleChatChange} />
        {
          currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ):(
            <ChatContainer currentChat={currentChat} currentUser={currentUser} />
          )
        }
      </div>
    </Container>
  )
};

const Container = styled.div`
  height:100vh;
  width:100vw;
  background-color:#2D4059;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  gap:1rem;

  .container {
    height: 85vh;
    width: 85vw;
    background-color:#112B3C;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 420px) and (max-width: 720px){
      grid-template-columns: 35% 65%;
    }
  }
`

export default Chat;