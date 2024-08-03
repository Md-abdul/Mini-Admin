import React from "react";
import { ButtonGroup, Button, Box, Text } from "@chakra-ui/react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Pagination = ({
  totalRows,        // total count of data which present in the api 
  rowsPerPage,
  onPageChange,
  selectedRowsCount,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage); // Math.ceil took find nearest number 

  const handlePageChange = (newPage) => {
    // main page changing funciton whihch handel all pages
    onPageChange(newPage);
  };

  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w={"100%"}
    >
      <Text>{`${selectedRowsCount} of ${totalRows} row(s) selected`}</Text>

      <Box display={"flex"} alignItems={"center"} gap={"15px"}>
        <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
        <ButtonGroup variant="outline" spacing="2">
          <Button
            onClick={() => handlePageChange(1)}
            isDisabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>

          {[...Array(totalPages).keys()].map((page) => (
            <Button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              colorScheme={currentPage === page + 1 ? "teal" : "gray"}
            >
              {page + 1}
            </Button>
          ))}

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            onClick={() => handlePageChange(totalPages)}
            isDisabled={currentPage === totalPages}
          >
            Last
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};
