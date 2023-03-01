import logo from "@/../public/daische-transparent-logo.png";
import { MenuClearTasksItem } from "@/layout/header/menu-items/ClearTasks";
import { MenuNewTaskItem } from "@/layout/header/menu-items/NewTask";
import { MenuProfileItem } from "@/layout/header/menu-items/Profile";
import { MenuReloadTasksItem } from "@/layout/header/menu-items/ReloadTasks";
import {
  Button,
  Container,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuDivider,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { CaretDown } from "phosphor-react";
import React from "react";

export const Header = () => {
  return (
    <Container as="header" maxW="container.lg" marginTop={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Link as={NextLink} href="/">
          <Image
            src={logo}
            quality={100}
            width={180}
            alt="Daische Logo"
            priority
          />
        </Link>
        <Menu>
          <MenuButton
            as={Button}
            size="lg"
            backgroundColor="white"
            color="black"
            _hover={{ backgroundColor: "whiteAlpha.900" }}
            _active={{ backgroundColor: "whiteAlpha.800" }}
          >
            <HStack>
              <Text>Actions</Text>
              <Icon as={CaretDown} ml={2} />
            </HStack>
          </MenuButton>
          <MenuList marginTop={2}>
            <MenuNewTaskItem />
            <MenuReloadTasksItem />
            <MenuClearTasksItem />
            <MenuDivider />
            <MenuProfileItem />
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  );
};
