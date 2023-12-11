import { IconPlaylistAdd } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDisclosure, useInputState } from '@mantine/hooks';
import { Modal, Button, TextInput, Image, Title, Flex, Text, Divider } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { IconTrash } from '@tabler/icons-react'

interface SpotifyUser {
  display_name: string;
  id: string
}

export default function PlaylistPage() {
  const navigate = useNavigate();

  const [playlistName, setPlaylistName] = useInputState('');
  const [playlistDescription, setPlaylistDescription] = useInputState('');
  const [playlists, setPlaylists] = useState([]);
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState<SpotifyUser | null>(null);

  const token = localStorage.getItem('token')
  const [opened, { open, close }] = useDisclosure(false);

  // onClick={() => handleDelete(playlist.id)}

  useEffect(() => {
    fetchUSER();
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user.id)
      fetchPlaylists();
    }
  }, [user]);

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

  function handleID(playlist: object) {
    const playlistTrack = JSON.stringify(playlist);
    window.localStorage.setItem('playlistTrack', playlistTrack)
    navigate("/targetplaylistpage");
  }

  const renderItem = (playlist: any, index: number) => {
    const imageUrl = playlist.images.length > 0 ? playlist.images[0].url : 'https://placekitten.com/300/300';
    return (
      <Flex
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="column"
        key={index}
      >
        <span onClick={() => handleID(playlist)} style={{ cursor: 'pointer' }}>
          <Image radius='sm' src={imageUrl} w={150} h={150} />
        </span>
        <Flex
          gap='xs'
          direction='row'
          justify='flex-start'
          align='flex-start'
        >
          <Text size='md' style={{ display: 'flex', flexWrap: 'wrap' }}>{playlist.name}</Text>
          <div>
            <IconTrash color='red' size={16} style={{ cursor: 'pointer' }} onClick={() => handleDelete(playlist.id)} />
          </div>
        </Flex>
      </Flex>
    );
  };

  const fetchPlaylists = () => {
    if (user) {
      const userid = user.id; // Access user ID directly here
      console.log('the token is: ' + token)
      console.log('user id is: ' + userid)
      
      fetch(`https://api.spotify.com/v1/users/${userid}/playlists`, {
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
          const userPlaylists = data.items.filter((playlist) => playlist.owner.display_name === user.display_name);
          setPlaylists(userPlaylists);
          console.log(userPlaylists);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function handleSubmit() {
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': `${playlistName}`,
        'description': `${playlistDescription}`,
        'public': true
      })
    });
    setTimeout(fetchPlaylists, 200)
    setPlaylistName('')
    setPlaylistDescription('')
    close()
  }

  function handleDelete(playlistId) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setTimeout(fetchPlaylists, 200)
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
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        <Title>Create a new playlist</Title>
        <IconPlaylistAdd onClick={open} size='150' style={{ cursor: 'pointer' }} />
      </Flex>
      <Divider style={{ width: '100%', marginTop: '-1.3rem', marginBottom: '1.3rem' }} />

      <Modal opened={opened} onClose={close} title="Create a Public Playlist:">
        <Flex
          gap="lg"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
        >
          <Flex
            gap="sm"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <TextInput value={playlistName} placeholder='Playlist name...' onChange={setPlaylistName} />
            <TextInput value={playlistDescription} placeholder='Playlist description...' onChange={setPlaylistDescription} />
          </Flex>
          <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Flex>
      </Modal>
      <Flex
        gap="xl"
        justify="flex-start"
        align="flex-start"
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
