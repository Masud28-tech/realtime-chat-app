import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'; // For warning
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components';


const SetAvatarPage = () => {
    const navigate = useNavigate();
    const avatarsApi = "https://api.multiavatar.com/45678945";
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAvatarsData() {
            const avatarsData = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${avatarsApi}/${Math.round(Math.random() * 1000)}`); //${Math.round(Math.random() * 1000)}
                const buffer = new Buffer(image.data);
                avatarsData.push(buffer.toString("base64"));
            }
            setAvatars(avatarsData);
            setIsLoading(false);
        }
        fetchAvatarsData();
    }, []);


    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div
                                    className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                                    key={index}

                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button className='submit-btn' >Choose as profile pic</button>

            </Container>
            <ToastContainer />
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    gap:3rem;
    background-color:#2D4059;
    height: 100vh;
    weight: 100vw;
    
    .title-container{
        h1{
            color:white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border: 0.5rem solid transparent;
            border-radius: 5rem;
            padding: 0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
                border: 0.4rem solid #F8CB2E;
        }
    }

    .submit-btn{

      padding: 1rem 2rem;
      background:#17B794;
      color: white;
      border: none;
      border-radius: 0.4rem;
      font-size:1rem;
      font-weight: bold;
      text-transform:uppercase;
      cursor:pointer;
      transition: 0.5s ease-in-out;
      &:hover{
        background-color:#2F8886;
      }
    }

`
export default SetAvatarPage;