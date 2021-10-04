import React, { useRef } from "react";
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
import Image from "next/image";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useApolloClient } from "@apollo/client";
import logo from "../../public/images/logo.png";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const router = useRouter();
    const client = useApolloClient();
    const { data, loading } = useMeQuery();
    const [logout] = useLogoutMutation();

    return (
        <div className={"navbar_container"}>
            <NextLink href="/app" passHref={true}>
                <a className={"navbar_logo"}>
                    <svg
                        width="109"
                        height="33.21"
                        viewBox="0 0 79 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.4991 2.6994L14.5328 11.6505C14.711 12.046 14.5912 12.5123 14.2444 12.7728L2.87202 21.3161C2.1161 21.8839 1.09517 21.088 1.46097 20.216L8.79964 2.72167C9.11303 1.97459 10.1662 1.96079 10.4991 2.6994Z"
                            fill="#C03BCB"
                            stroke="#6E0777"
                        />
                        <path
                            d="M8.81348 2.71401L4.57428 12.8571C4.39703 13.2813 4.55722 13.7712 4.95073 14.0087L16.9971 21.2757C17.7749 21.7449 18.693 20.9313 18.3213 20.1024L10.514 2.69216C10.182 1.95167 9.12642 1.96523 8.81348 2.71401Z"
                            fill="#8E2E96"
                            stroke="#6E0777"
                        />
                        <path
                            d="M23.7383 18.8723L24.8732 15.4794H30.0448L31.1866 18.8723H33.8463L28.9971 5.1123H25.921L21.0786 18.8723H23.7383ZM25.5449 13.4772L27.4053 7.93417H27.5128L29.3732 13.4772H25.5449ZM35.5505 22.7423H37.9818V17.2463H38.0825C38.4654 17.9988 39.2646 19.0537 41.0377 19.0537C43.4691 19.0537 45.2892 17.1254 45.2892 13.7258C45.2892 10.2857 43.4153 8.41792 41.031 8.41792C39.2109 8.41792 38.452 9.51305 38.0825 10.2589H37.9415V8.5523H35.5505V22.7423ZM37.9348 13.7123C37.9348 11.7101 38.7945 10.4134 40.3594 10.4134C41.9781 10.4134 42.8108 11.7907 42.8108 13.7123C42.8108 15.6473 41.9645 17.0582 40.3594 17.0582C38.8079 17.0582 37.9348 15.7145 37.9348 13.7123ZM51.8711 19.0739C54.8934 19.0739 56.8144 16.944 56.8144 13.7526C56.8144 10.5545 54.8934 8.41792 51.8711 8.41792C48.8488 8.41792 46.9279 10.5545 46.9279 13.7526C46.9279 16.944 48.8488 19.0739 51.8711 19.0739ZM51.8846 17.1254C50.2122 17.1254 49.3929 15.6339 49.3929 13.7459C49.3929 11.8579 50.2122 10.3462 51.8846 10.3462C53.5301 10.3462 54.3494 11.8579 54.3494 13.7459C54.3494 15.6339 53.5301 17.1254 51.8846 17.1254ZM61.3092 5.1123H58.8779V18.8723H61.3092V5.1123ZM66.2406 5.1123H63.8094V18.8723H66.2406V5.1123ZM73.2408 19.0739C76.2631 19.0739 78.1839 16.944 78.1839 13.7526C78.1839 10.5545 76.2631 8.41792 73.2408 8.41792C70.2184 8.41792 68.2975 10.5545 68.2975 13.7526C68.2975 16.944 70.2184 19.0739 73.2408 19.0739ZM73.2542 17.1254C71.5818 17.1254 70.7624 15.6339 70.7624 13.7459C70.7624 11.8579 71.5818 10.3462 73.2542 10.3462C74.8996 10.3462 75.719 11.8579 75.719 13.7459C75.719 15.6339 74.8996 17.1254 73.2542 17.1254Z"
                            fill="#1E1C1C"
                        />
                    </svg>
                </a>
            </NextLink>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: 0,
                }}
            >
                <div style={{ alignSelf: "center !important" }}>
                    <NextLink href="/new" passHref={true}>
                        <a className={"navbar_option"}>New Product</a>
                    </NextLink>
                </div>
                {data && !loading && (
                    <Menu>
                        <MenuButton
                            backgroundColor="gray.50"
                            variant="solid"
                            _active={{
                                backgroundColor: "gray.100",
                            }}
                            style={{ fontWeight: 500 }}
                            className={"menu_button"}
                            border="1px solid lightgray"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            {data?.me.name}
                        </MenuButton>
                        <MenuList className={"menu_list"}>
                            <NextLink href="/pref">
                                <MenuItem
                                    fontWeight="medium"
                                    className={"menu_item"}
                                >
                                    Settings
                                </MenuItem>
                            </NextLink>
                            <MenuDivider className={"menu_divider"} />
                            <MenuItem
                                className={"menu_item"}
                                fontWeight="medium"
                                style={{ color: "var(--red-500)" }}
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
