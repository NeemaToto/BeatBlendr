import { useEffect, useState } from 'react'
import { Image, Title, Flex, Text, Divider } from '@mantine/core';

interface SpotifyUser {
    display_name: string;
    id: string
}

export default function DisplayAndAddPlaylists({ title, trackURI, closeModal }) {
    const [playlists, setPlaylists] = useState([]);
    const token = localStorage.getItem('token')
    // const [userId, setUserId] = useState('')
    const [user, setUser] = useState<SpotifyUser | null>(null);

    useEffect(() => {
        fetchUSER();
    }, []);

    useEffect(() => {
        if (user) {
            fetchPlaylists();
            // setUserId(user.id)
        }
    }, [user]);

    if (!user) {
        return <div>User not found or not loaded.</div>;
      }

    const renderItem = (playlist: any, index: number) => {
        const imageUrl = playlist.images.length > 0 ? playlist.images[0].url : 'https://placekitten.com/300/300';

        const playlistID = playlist.id
        return (
            <Flex
                gap="xs"
                justify="flex-start"
                align="flex-start"
                direction="column"
                key={index}
            >
                <span onClick={() => handleAddTrack(playlistID)} style={{ cursor: 'pointer' }}>
                    <Image radius='sm' src={imageUrl} w={150} h={150} />
                    <Text size='md' style={{ display: 'flex', flexWrap: 'wrap' }}>{playlist.name}</Text>
                </span>
            </Flex>
        );
    };

    function fetchUSER() {
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Failed to fetch user');
                }
            })
            .then((data) => {
                setUser(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchPlaylists = () => {
        fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch playlists');
                }
            })
            .then((data) => {
                if (user) {
                    const userPlaylists = data.items.filter((playlist: { owner: { display_name: string; }; }) => playlist.owner.display_name === user.display_name);
                    setPlaylists(userPlaylists);
                    console.log(userPlaylists);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleAddTrack(playlistID) {
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'uris': [
                    `${trackURI}`
                ],
                'position': 0
            })
        })
            .then(() => {
                closeModal();
            })

    }

    return (
        <Flex
            gap="lg"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
        >
            <Flex
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
            >
                <Title order={3}>Add {title} to a playlist by tapping it:</Title>
            </Flex>
            <Divider style={{ width: '100%', }} />
            <Flex
                gap="xl"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
            >
                {
                    playlists && playlists.map((playlist, index) => renderItem(playlist, index))
                }
            </Flex>
        </Flex>

    )
}
