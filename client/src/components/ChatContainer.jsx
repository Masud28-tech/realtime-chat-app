import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { sendMessageRoute, getAllMessagesRoute } from '../utils/APIRoutes';

import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';

const ChatContainer = ({ currentChat, currentUser }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchAllMessages() {
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
        currentChat && currentUser && fetchAllMessages();
    }, [currentChat])


    const sendMessage = async (msg) => {
        if (currentChat && currentUser) {
            await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });
        }
    }
    return (
        <>
            {
                currentChat && (
                    <Container>
                        <div className="chat-header">
                            <div className="user-details">
                                <div className="avatar">
                                    <img
                                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="username">
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        <div className="chat-messages">
                            <Messages messages={messages} />
                        </div>
                        <ChatInput sendMessage={sendMessage} />



                    </Container>
                )
            }
        </>
    );
};

const Container = styled.div`
    padding-top: 1rem;
    display:grid;
    gap: 0.1rem;
    grid-template-rows: 10% 80% 10%;
    overflow:hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-rows: 15% 70% 15%;
    }
    @media screen and (min-width: 420px) and (max-width: 720px){
      grid-template-rows: 15% 70% 15%;
    }
    .chat-header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding: 0 2rem;
        .user-details{
            display:flex;
            align-items:center;
            gap:1rem;
            .avatar{
                img{
                    height:3rem;
                }
            }
            .username{
                h3{
                    color:white;
                }
            }
        }
    }

`

export default ChatContainer;