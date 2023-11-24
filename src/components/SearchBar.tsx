import { useState } from "react";
import { Input, Button, Container, Flex } from "@mantine/core";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(`Searching for "${searchQuery}"...`);
  };

  return (
    <>
      <Container  mt={120}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap="sm"
          align="center"
        >
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            radius="xl"
          />
          <Button onClick={handleSearchClick}  size="xs" radius="xl">
            Search
          </Button>
        </Flex>
      </Container>
    </>
  );
};