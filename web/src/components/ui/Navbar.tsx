import React from "react";
import {
    Box,
    Button,
    ChakraProvider,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useApolloClient } from "@apollo/client";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const router = useRouter();
    const client = useApolloClient();
    const { data, loading } = useMeQuery();
    const [logout] = useLogoutMutation();
    return (
        <div className={"navbar_container"}>
            <NextLink href="/app" passHref={true}>
                <a>
                    <h1 className={"navbar_logo"}>Apollo</h1>
                </a>
            </NextLink>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "center",
                    marginLeft: "auto",
                    marginRight: 0,
                }}
            >
                <NextLink href="/new" passHref={true}>
                    <a className={"navbar_option"}>New Product</a>
                </NextLink>
                {data && !loading && (
                    <Menu>
                        <MenuButton
                            backgroundColor="gray.50"
                            variant="solid"
                            _active={{
                                backgroundColor: "gray.100",
                            }}
                            border="1px solid lightgray"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            {data?.me.name}
                        </MenuButton>
                        <MenuList>
                            <NextLink href="/pref">
                                <MenuItem fontWeight="medium">
                                    Settings
                                </MenuItem>
                            </NextLink>
                            <MenuDivider />
                            <MenuItem
                                fontWeight="medium"
                                color={"red.500"}
                                onClick={async () => {
                                    logout();
                                    await client.resetStore();
                                    router.push("/");
                                }}
                            >
                                Log out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </div>
        </div>
    );
};
