import React from 'react';
import styled from 'styled-components';
import WelcomeRobo from '../assets/robot.gif';

const Welcome = ({ currentUser }) => {
    return (
        <Container>
            <img src={WelcomeRobo} alt="welcome" />
            <h2>Welcome, <span>{currentUser ? currentUser.username : "Buddy"}!</span></h2>
            <h3>Please select a chat to start messaging.</h3>
        </Container>
    );
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    color: white;
    img{
        height:25rem;
    }
    span{
        color:#1CD6CE;
    }

`
export default Welcome;