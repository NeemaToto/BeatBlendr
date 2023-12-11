// SearchPage.js
import SearchBar from './SearchBar';
import { useState } from 'react';
import { Modal, Image, Flex, Text, Title, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DisplayAndAddPlaylists from './DisplayAndAddPlaylists';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token')
  const [results, setResults] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [songName, setSongName] = useState('');
  // const [songImage, setSongImage] = useState('');
  const [songURI, setSongURI] = useState('')

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(() => query);
    console.log('you searched this item: ' + searchQuery);
    handleFetchTracks(query)
  };

  function handleFetchTracks(query) {
    setSearchQuery(query)
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch results');
        }
      })
      .then((data) => {
        setResults(data.tracks.items)
        console.log(data.tracks.items)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const renderItem = (result: any, index: number) => {
    const songName =
      result.name.length > 28
        ? `${result.name.substring(0, 28)}...`
        : result.name;

    const songImageURL =
      result.album.images[0] && result.album.images[0].url
        ? result.album.images[0].url
        : 'https://placekitten.com/300/300';

    const songURI = result.uri;

    return (
      <Flex
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="column"
        key={index}
        w={150}
      >
        <span onClick={() => handleClick(songName, songURI)} style={{ cursor: 'pointer' }}>
          <Image radius='sm' src={songImageURL} w={150} h={150} />
          <Text size='md' style={{ display: 'flex', flexWrap: 'wrap' }}>{songName}</Text>
        </span>
      </Flex>
    );
  };

  function handleClick(songName, songURI) {
    setSongName(songName)
    // setSongImage(songImageURL)
    setSongURI(songURI)
    open()
  }

  return (
    <Flex
      gap="xl"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      <Flex
        gap="xs"
        justify="flex-start"
        align="flex-end"
        direction="column"
      >
        <Title>Search for Songs!</Title>
        <SearchBar onSubmit={handleSearchSubmit} />
      </Flex>
      <Divider style={{ width: '100%' }} />
      <Modal opened={opened} onClose={close} >

        <DisplayAndAddPlaylists title={songName} trackURI={songURI} closeModal={close} />
      </Modal>
      <Flex
        gap="xl"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {
          searchQuery &&
          <Title>Search Results for: {searchQuery}</Title>
        }
        <Flex
          gap="xl"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          {
            results && results.map((result, index) => renderItem(result, index))
          }
        </Flex>
      </Flex>
    </Flex>
  );
}
