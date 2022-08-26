import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/chat-logo.svg';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted');
  }
  const handleChange = (e) => {

  }
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Hommies Chat</h1>
          </div>

          <input
            type="text"
            placeholder='Name'
            name='name'
            onClick={handleChange}
          />
          <input
            type="text"
            placeholder='username'
            name='username'
            onClick={handleChange}
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            onClick={handleChange}
          />
          <input
            type="password"
            placeholder='Confirm Password'
            name='confirmPassword'
            onClick={handleChange}
          />

          <button type='submit'>Create User</button>

          <span> Already have an account? <Link to='/login'>Login</Link></span>

        </form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  
`

export default Register;