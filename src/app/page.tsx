"use client"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { redirect } from 'next/navigation'
import key from "../../key.json"
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  color: #61dafb;  /* Bright blue for font color */
  font-family: 'Arial', sans-serif;
`;

const Form = styled.form`
  padding: 40px;
  background-color: #282c34;  /* Slightly lighter grayish-blue for the form */
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #444;  /* Dark border for inputs */
  background: #333;  /* Darker input background */
  color: #fff;  /* White font for input */
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 15px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff5555;  /* Reddish tone for error messages */
  margin-top: 15px;
`;

export default function LoginPage() {
  const [keys, setKeys] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(document.cookie){
      window.location.href = "/dashboard"
  }
  })

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (keys === key[0]) {
      document.cookie = keys;
      window.location.href = '/dashboard';
    } else {
      setErrorMessage('Invalid key!');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="key">Enter Key:</Label>
        <Input
          type="text"
          id="key"
          value={keys}
          onChange={(e) => setKeys(e.target.value)}
          placeholder="Enter your key"
        />
        <Button type="submit">Login</Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Container>
  );
}
