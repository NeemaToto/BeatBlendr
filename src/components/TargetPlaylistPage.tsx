import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Image, Flex, Divider, Title, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react'

export default function TargetPlaylistsPage() {
    const location = useLocation();
    const token = location.state.token;
    const [tracks, setTracks] = useState([]);
    const [playlistID, setPlaylistID] = useState('');
    const [playlistSnapshot, setPlaylistSnapshot] = useState('');
    const playlistObject = JSON.parse(location.state.playlistTarget);

    const trackLink = playlistObject.tracks.href;

    useEffect(() => {
        fetchTracks();
    }, []);

    useEffect(() => {
        setPlaylistID(playlistObject.id);
        setPlaylistSnapshot(playlistObject.snapshot_id);
    }, [playlistObject.id, playlistObject.snapshot_id]);


    function fetchTracks() {
        fetch(`${trackLink}`, {
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
                setTracks(data.items);
                console.log(data.items);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleDelete(uri: any, snapshot: string) {
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'tracks': [
                    {
                        'uri': uri
                    }
                ],
                'snapshot_id': snapshot
            })
        })
            .then(() => {
                console.log('uri: ' + uri)
                console.log('snapchat: ' + snapshot)
            })
        window.location.reload();
    }

    const renderItem = (song: any, index: number) => {
        const songName = song.track.name.length > 28
            ? `${song.track.name.substring(0, 28)}...`
            : song.track.name;

        const songImageURL = song.track.album.images[0] && song.track.album.images[0].url
            ? song.track.album.images[0].url
            : 'https://placekitten.com/300/300';

        return (
            <Flex
                gap="xs"
                justify="flex-start"
                align="flex-start"
                direction="column"
                key={index}
                w={150}
            >
                <Image radius='sm' src={songImageURL} w={150} h={150} />
                <Flex
                    gap='xs'
                    direction='row'
                    justify='flex-start'
                    align='flex-start'
                >
                    <Text size='md' style={{ display: 'flex', flexWrap: 'wrap' }}>{songName}</Text>
                    <div>
                        <IconTrash color='red' size={16} style={{ cursor: 'pointer' }} onClick={() => handleDelete(song.track.uri, playlistSnapshot)} />
                    </div>
                </Flex>
            </Flex>
        );
    };

    const renderImage = (playlist: any) => {
        const playlistImageURL =
            playlist.images[0] && playlist.images[0].url
                ? playlist.images[0].url
                : 'https://placekitten.com/300/300';

        return (
            <Flex
                gap="xs"
                justify="flex-start"
                align="flex-end"
                direction="row"
            >
                <Image radius='sm' src={playlistImageURL} w={250} h={250} />
                <Flex
                    gap='xs'
                    justify='flex-start'
                    align='flex-start'
                    direction='column'
                >
                    <Title order={1}>{playlist.name}</Title>
                    <Text c='dimmed'>{playlist.description || 'No description'}</Text>
                </Flex>
            </Flex>
        );
    };

    return (
        <Flex
            gap="xl"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
        >
            {
                renderImage(playlistObject)
            }
            <Divider my='lg' style={{ width: '100%' }} />
            <Flex
                gap="xl"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                {
                    tracks && tracks.map((song, index) => renderItem(song, index))
                }
            </Flex>
        </Flex>
    )
}