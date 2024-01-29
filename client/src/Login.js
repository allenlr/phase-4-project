/** @jsxImportSource @emotion/react */

import React, { useContext, useState } from 'react';
import UserContext from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background-color: #fffff;
`;

const Form = styled.form`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: black;
  min-width: 300px;
`;

const Label = styled.div`
  color: white;
  margin-top: 10px;
`;

const Input = styled.input`
  margin: 5px 0 15px;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: block;
  width: calc(100% - 22px);
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  width: 100%;
  margin: 10px 0;
  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = styled(Button)`
  background-color: transparent;
//   color: #007bff;
  padding: 0;
  font-size: 15px;
  margin: 0 0 15px;
  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  margin-top: 10px;
`;

function Login(){

    const navigate = useNavigate();

    const { setCurrentUser, setIsLoading} = useContext(UserContext);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.jwt) {
                    localStorage.setItem("token", data.jwt);
                    const { jwt, ...userDetails } = data;
                    setCurrentUser(userDetails);
                    setError("");
                    setIsLoading(false);
                    navigate('/');
                } else {
                    setError(data.error);
                    setIsLoading(false);
                }
            });
    }



    return(
        <Container>
            <Label css={css`
                font-size: 25px;
                font-weight: bold;
                margin-bottom: 20px;
                display: block
            `}>Login</Label>
            <Form onSubmit={handleLogin}>
                <Label>username:</Label>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Label>password:</Label>
                <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ToggleButton type="button" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </ToggleButton>
                <Button type="submit">Login</Button>
                {error && <ErrorMsg>{error}</ErrorMsg>}
            </Form>
        </Container>
    )
}

export default Login;