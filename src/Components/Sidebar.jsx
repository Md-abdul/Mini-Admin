import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorMode,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Avatar,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiSearch,
  FiUser,
  FiUsers,
  FiPhone,
  FiMessageCircle,
  FiBookmark,
  FiSettings,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { ChatWindow } from "./ChatWindow";

export const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showChatList, setShowChatList] = useState(true);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        let res = await fetch(
          `https://devapi.beyondchats.com/api/get_all_chats?page=2`
        );
        let resdata = await res.json();
        setData(resdata.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserList();
  }, []);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    setShowChatList(false);
  };

  const handleBackToChatList = () => {
    setSelectedChatId(null);
    setShowChatList(true);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        data={data}
        onClose={() => onClose()}
        onSelectChat={handleChatSelect}
        onOpenProfile={onOpen}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <UserProfile onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        display={{ base: "flex", md: "none" }}
        onOpen={onOpen}
        showChatList={showChatList}
        onBack={handleBackToChatList}
      />
      <Box ml={{ base: 0, md: 80 }} p="4">
        {selectedChatId ? (
          <ChatWindow chatId={selectedChatId} onBack={handleBackToChatList} />
        ) : (
          <SidebarContent
            data={data}
            onClose={() => {}}
            onSelectChat={handleChatSelect}
            display={{ base: "block", md: "none" }}
          />
        )}
      </Box>
    </Box>
  );
};

const SidebarContent = ({
  onClose,
  data,
  onSelectChat,
  onOpenProfile,
  ...rest
}) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 80 }}
      pos="fixed"
      h="full"
      overflowY="auto"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <IconButton
          display={{ base: "none", md: "flex" }}
          variant="outline"
          onClick={onOpenProfile}
          aria-label="open menu"
          icon={<FiMenu />}
          mr={4}
        />
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FiSearch />} />
          <Input
            placeholder="Search"
            borderRadius={"20px"}
            border={"2px solid gray"}
          />
        </InputGroup>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <VStack
        mt="4"
        spacing="2"
        px="4"
        align="start"
        display={{ base: "flex", md: "flex" }}
      >
        {data.map((chat) => (
          <React.Fragment key={chat.id}>
            <Flex
              align="center"
              p="2"
              w="100%"
              borderRadius="md"
              _hover={{ bg: ("gray.100", "gray.300") }}
              onClick={() => onSelectChat(chat.id)}
              cursor={"pointer"}
              boxShadow={
                "rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px"
              }
            >
              <Avatar
                name={chat.creator.name}
                bg="teal.500"
                color="white"
                size="sm"
                mr="2"
              />
              <Text fontSize="md" fontWeight="medium">
                {chat.creator.name || "Nadim Khan"}
              </Text>
            </Flex>
          </React.Fragment>
        ))}
      </VStack>
    </Box>
  );
};

const UserProfile = ({ onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const profileOptions = [
    { name: "My Profile", icon: FiUser },
    { name: "New Group", icon: FiUsers },
    { name: "Contacts", icon: FiPhone },
    { name: "Calls", icon: FiPhone },
    { name: "People Nearby", icon: FiMessageCircle },
    { name: "Saved Messages", icon: FiBookmark },
    { name: "Settings", icon: FiSettings },
  ];

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      w="full"
      pos="fixed"
      h="full"
      overflowY="auto"
      transition="background-color 0.5s ease"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Profile Section
        </Text>
        <Flex alignItems="center">
          <IconButton
            aria-label="toggle theme"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            mr={2}
          />
          <CloseButton onClick={onClose} />
        </Flex>
      </Flex>
      <Box p="4">
        <Flex alignItems="center">
          <Avatar size="xl" name="User Name" bg="teal.500" color="white" />
          <Box ml="4">
            <Text fontSize="lg" fontWeight="medium">
              John Doe
            </Text>
            <Text mt="2" color="gray.500">
              johndoe123@gmail.com
            </Text>
          </Box>
        </Flex>
        <VStack mt="8" spacing="4" align="start">
          {profileOptions.map((option) => (
            <Flex
              key={option.name}
              align="center"
              w="full"
              p="2"
              borderRadius="md"
              _hover={{ bg: ("gray.100", "gray.200") }}
              cursor="pointer"
            >
              <Box as={option.icon} mr="4" />
              <Text>{option.name}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

const MobileNav = ({ onOpen, showChatList, onBack, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 80 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      {...rest}
    >
      {showChatList ? (
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
        />
      ) : (
        <IconButton
          variant="outline"
          onClick={onBack}
          aria-label="go back"
          icon={<FiMenu />}
        />
      )}
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        {showChatList ? (
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FiSearch />} />
            <Input
              placeholder="Search"
              borderRadius={"20px"}
              border={"2px solid gray"}
            />
          </InputGroup>
        ) : (
          "Chat"
        )}
      </Text>
      <Avatar size="sm" name="User" bg="teal.500" color="white" />
    </Flex>
  );
};
