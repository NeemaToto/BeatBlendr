import { Button, Flex, Title, Text } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const CLIENT_ID = '7b9216d7dfaf48198a6781b33411740b';
    const REDIRECT_URI = 'http://localhost:5173/';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token'

    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>('');

    useEffect(() => {
        const hash = window.location.hash
        let storedToken = window.localStorage.getItem("token")

        if (!storedToken && hash) {
            const foundToken = hash
                .substring(1)
                .split('&')
                .find(elem => elem.startsWith('access_token'));

            if (foundToken) {
                storedToken = foundToken.split('=')[1];
                window.location.hash = '';
                window.localStorage.setItem('token', storedToken);
                navigate("/dashboard");
            }
        }
        setToken(storedToken || ''); // Set an empty string as default if token is null 
    }, [])

    console.log('this is a token' + token)

    return (
        <Flex justify="center" align="center" direction='column' style={{ padding: '10px 20px', gap: '2rem', height: '60vh' }}>
            <Flex justify="center" align="center" direction='column'>
                <Title order={1}>
                    Welcome to BeatBlendr!
                </Title>
                <Title order={6}>
                    <Text size="lg">To use our features, please sign in to your spotify account</Text>
                </Title>
            </Flex>
            <Button component='a' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</Button>
        </Flex>
    )
}