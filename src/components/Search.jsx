import React, { useState } from "react";
import { Box, Button, Input, Flex } from "@chakra-ui/react";
import { FaTrash, FaSearch } from "react-icons/fa";

export const Search = ({ data, onUpdateData, selectedRows, onDelete }) => {  // all propos are destructor
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Implement search functionality

    const filteredData = data.filter(
      (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) //case-insensitive search based on the name
    );
    onUpdateData(filteredData);
  };

  const handleDelete = () => {
    // Perform delete operation on selectedRows
    onDelete(selectedRows);
  };

  return (
    <Box mb={5}>
      <Flex justify="space-between" align="center">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}   // target the input box and data 
          w="30%"
        />
        <Button
          colorScheme="teal"
          onClick={handleSearch}
          leftIcon={<FaSearch />}
          mr={"600px"}
        >
          Search
        </Button>
        <Button
          colorScheme="red"
          leftIcon={<FaTrash />}
          onClick={handleDelete}
          isDisabled={selectedRows.length === 0}     // when no data is selected then it will be 0
        ></Button>
      </Flex>
    </Box>
  );
};
