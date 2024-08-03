import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiSend,
  FiPhone,
  FiSearch,
  FiMoreVertical,
  FiArrowLeft,
} from "react-icons/fi";

export const ChatWindow = ({ chatId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  const iconColor = useColorModeValue("gray", "black");

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        let res = await fetch(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        );
        let resdata = await res.json();
        setMessages(resdata.data);
        if (resdata.data.length > 0) {
          setUser(resdata.data[0].sender);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatMessages();
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    setNewMessage("");
    // Implement your send message logic here
  };

  return (
    <Box
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflowY="auto"
      h="full"
      display="flex"
      flexDirection="column"
    >
      {user && (
        <Flex
          alignItems="center"
          mt={2}
          mb="4"
          borderBottom="2px"
          p={5}
          borderColor="gray.200"
          pb="2"
          pos="fixed"
          w={{ base: "85%", md: "45%", lg: "75%", sm: "85%" }}
          top="0"
          zIndex="1000"
          overflowX={"auto"}
          borderRadius="10px"
          bg="white"
          boxShadow={
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
          }
        >
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={<FiArrowLeft />}
            size="sm"
            variant="ghost"
            aria-label="Back"
            mr="2"
            color={iconColor}
            onClick={onBack} // Call onBack function when back button is clicked
          />
          <Avatar
            name={user.name}
            bg="teal.500"
            color="white"
            size="md"
            mr="2"
          />
          <Text fontSize="lg" fontWeight="bold" flex="1" color={"red.300"}>
            {user.name}
          </Text>
          <IconButton
            icon={<FiPhone />}
            size="sm"
            variant="ghost"
            aria-label="Call"
            mr="2"
            color={iconColor}
          />
          <IconButton
            icon={<FiSearch />}
            size="sm"
            variant="ghost"
            aria-label="Search"
            mr="2"
            color={iconColor}
          />
          <IconButton
            icon={<FiMoreVertical />}
            size="sm"
            variant="ghost"
            aria-label="More options"
            color={iconColor}
          />
        </Flex>
      )}

      <Box flex="1" overflowY="auto" mb="4">
        {messages.map((message) => (
          <Flex
            key={message.id}
            align="center"
            mb="4"
            mt={20}
            justifyContent={message.sender_id === 1 ? "flex-end" : "flex-start"}
          >
            {message.sender_id !== 1 && (
              <Avatar name={message.sender.name} size="sm" mr="2" />
            )}
            <Box
              bg={message.sender_id === 1 ? "teal.500" : "gray.200"}
              color={message.sender_id === 1 ? "white" : "black"}
              px="4"
              py="2"
              borderRadius="md"
            >
              <Text>{message.message}</Text>
            </Box>
            {message.sender_id === 1 && (
              <Avatar name={message.sender.name} size="sm" ml="2" />
            )}
          </Flex>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Flex align="center" borderTop="1px" borderColor="gray.200" pt="2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          flex="1"
          mr="2"
          border="2px solid gray"
          p={5}
          borderRadius={"20px"}
        />
        <IconButton
          icon={<FiSend />}
          colorScheme="teal"
          onClick={handleSendMessage}
          aria-label="Send message"
        />
      </Flex>
    </Box>
  );
};

export default ChatWindow;
