import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Input,
  Center,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pagination } from "./Pagination";
import { Icon } from "@chakra-ui/react";
import { Search } from "./Search";

export const Admin = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [editableRow, setEditableRow] = useState(null);

  const toast = useToast();

  const handleDelete = (rowsToDelete) => {
    // Perform delete operation on rowsToDelete
    // For example, filter out the selected rows from the data
    const updatedData = data.filter((user) => !rowsToDelete.includes(user.id));
    setData(updatedData);

    // Clear the selectedRows and editableRow state
    setSelectedRows([]);
    setEditableRow(null);

    // Show toast message for successful deletion
    toast({
      title: "Rows Deleted",
      description: `Deleted ${rowsToDelete.length} row(s) successfully.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEdit = (userId) => {           // main edit functoin call
    setEditableRow(userId);
  };

  const handleSave = () => {
    // Perform save operation on editableRow with the new values
    // For example, update the data with the new values
    const updatedData = data.map((user) => {
      if (user.id === editableRow) {
        return { ...user };
      }
      return user;
    });
    setData(updatedData);

    // Clear the editableRow state
    setEditableRow(null);

    // Show toast message for successful save
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const fetchData = async () => {
    try {
      const userdata = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const res = await userdata.json();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (userId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <Center>
      <Box mt={8} width="75%">
        <Search
          data={data}
          selectedRows={selectedRows}
          onUpdateData={setData}
          onDelete={handleDelete}
        />
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getPaginatedData().map((user) => (
              <Tr
                key={user.id}
                bgColor={selectedRows.includes(user.id) ? "gray.200" : ""}
                style={{ height: "50px" }} // Adjust the height as needed
              >
                <Td style={{ height: "50px" }}>
                  <Checkbox
                    isChecked={selectedRows.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </Td>
                <Td style={{ height: "50px" }}>
                  {editableRow === user.id ? (
                    <Input
                      value={user.name}
                      onChange={(e) =>
                        setData((prevData) =>
                          prevData.map((u) =>
                            u.id === user.id
                              ? { ...u, name: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  ) : (
                    user.name
                  )}
                </Td>
                <Td style={{ height: "50px" }}>
                  {editableRow === user.id ? (
                    <Input
                      value={user.email}
                      onChange={(e) =>
                        setData((prevData) =>
                          prevData.map((u) =>
                            u.id === user.id
                              ? { ...u, email: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  ) : (
                    user.email
                  )}
                </Td>
                <Td style={{ height: "50px" }}>
                  {editableRow === user.id ? (
                    <Input
                      value={user.role}
                      onChange={(e) =>
                        setData((prevData) =>
                          prevData.map((u) =>
                            u.id === user.id
                              ? { ...u, role: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  ) : (
                    user.role
                  )}
                </Td>
                <Td style={{ height: "50px" }}>
                  <Flex>
                    {editableRow === user.id ? (
                      <Button colorScheme="teal" size="sm" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <IconButton
                        icon={<FaEdit />}
                        mr={2}
                        onClick={() => handleEdit(user.id)}
                      />
                    )}
                    <IconButton
                      icon={<Icon as={FaTrash} color="red.500" />}
                      onClick={() => handleDelete([user.id])}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>


             {/* Pagination components  started  */}

        <Pagination
          totalRows={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}            
          selectedRowsCount={selectedRows.length}
          currentPage={currentPage}
        />
      </Box>
    </Center>
  );
};

