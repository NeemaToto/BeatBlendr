import { Button, Flex, Title, Text } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { IconBrandSpotify } from '@tabler/icons-react'

export default function LandingPage() {
    const CLIENT_ID = '7b9216d7dfaf48198a6781b33411740b';
    const REDIRECT_URI = 'http://localhost:5173/';
    // https://beat-blendr.vercel.app/
    // http://localhost:5173/
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token'
    const SCOPES = 'playlist-modify-private playlist-modify-public playlist-read-private playlist-read-collaborative user-library-modify user-library-read';

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
            if (foundToken && foundToken) {
                storedToken = foundToken.split('=')[1];
                window.location.hash = '';
                window.localStorage.setItem('token', storedToken);
                navigate("/dashboard");
            }
        }
        setToken(storedToken || '');
    }, [])

    console.log('this is a token' + token)

    return (
        <Flex justify="center" align="center" direction='column' style={{ padding: '10px 20px', gap: '2rem', height: '60vh' }}>
            <Flex justify="center" align="center" direction='column'>
                <Title order={1} style={{ display: 'flex', textAlign: 'center', alignItems: 'flex-end', gap: '0.6rem' }}>
                    Welcome to <Text
                        size="50"
                        inline={true}
                        inherit={true}
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'grape', to: 'rgba(38, 71, 255, 1)', deg: 168 }}>
                        BeatBlendr!
                    </Text>

                </Title>
                <Title order={6}>
                    <Text size="lg">To use our features, please login to your <span style={{ color: '#1DB954' }}>Spotify</span> account</Text>
                </Title>
            </Flex>
            <Button
                component='a'
                href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`}
                rightSection={<IconBrandSpotify size={25} />}
            >
                Login to Spotify
            </Button>
        </Flex>
    )
}