// SearchBar.js
import { useState } from "react";
import { Input, Button, Container, Flex } from "@mantine/core";

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    onSubmit(searchQuery);
    console.log(`Searching for "${searchQuery}"...`);
  };

  return (
    <Container>
      <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          radius="xl"
        />
        <Button onClick={handleSearchClick} size="xs" radius="xl">
          Search
        </Button>
      </Flex>
    </Container>
  )
}
