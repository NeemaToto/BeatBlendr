import { IconPlaylistAdd } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDisclosure, useInputState } from '@mantine/hooks';
import { Modal, Button, TextInput, Image } from '@mantine/core';

export default function PlaylistPage() {

  const [playlistName, setPlaylistName] = useInputState('');
  const [playlistDescription, setPlaylistDescription] = useInputState('');
  const [playlists, setPlaylists] = useState([]);
  const userId = '4x4861vumsov7lev4npcgd82a'
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(`${token}`)
    if (token) {
      fetchPlaylists()
      console.log('passed')
    }
    else{
      console.log('failed')
    }
    
    console.log(token)
  }, [])

  const [opened, { open, close }] = useDisclosure(false);

  const renderItem = (playlist: any, index: number) => {
    const imageUrl = playlist.images.length > 0 ? playlist.images[0].url : 'https://placekitten.com/300/300';
    return (
      <div key={index}>
        <Image radius='sm' src={imageUrl} w={150} h={150} />
        <div>{`${playlist.name}`}</div>
      </div>
    );
  };

  const fetchPlaylists = () => {
    fetch('https://api.spotify.com/v1/me/playlists', {
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
        setPlaylists(data.items)
        console.log(data.items)
      })
      .catch(err => {
        console.log(err)
        
    })
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
        'public': false
      })
    });
    setTimeout(fetchPlaylists, 500)
    close()
  }

  return (
    <div className="Container">
      <Modal opened={opened} onClose={close} title="Create Playlist">
        <TextInput value={playlistName} placeholder='Playlist name...' onChange={setPlaylistName} />
        <TextInput value={playlistDescription} placeholder='Playlist description...' onChange={setPlaylistDescription} />
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </Modal>

      <IconPlaylistAdd onClick={open} size='150' />

      <div>{playlists.map((playlist, index) => renderItem(playlist, index))}</div>

    </div>
  )
}
