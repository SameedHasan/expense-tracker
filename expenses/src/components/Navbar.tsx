import { Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useFrappeAuth } from "frappe-react-sdk";
import { UserContext } from "../utils/UserProvider";

const Navbar = () => {
  //   const { currentUser, logout } = useFrappeAuth();
  const { currentUser, logout } = useContext(UserContext);

  useEffect(() => {
    //
  }, [currentUser]);

  if (currentUser) {
    // console.log("currentUser nav", currentUser);
  }

  return (
    <div>
      <Box bg="teal.500" px={4} py={3}>
        <Flex alignItems="center" justifyContent="space-between">
          <Link to="/">
            <Heading color="white" fontWeight="bold" as="h6" size="sm">
              My Logo - {currentUser}
            </Heading>
          </Link>
          <Flex alignItems="center" justifyContent="space-between" width={200}>
            <Link color="white" to="/">
              <Heading color="white" fontWeight="bold" as="h6" size="sm">
                Home
              </Heading>
            </Link>
            {/* <Link color="white" to="/login">
              Login
            </Link> */}
            <Link color="white" to="/expenses">
              <Heading color="white" fontWeight="bold" as="h6" size="sm">
                Expenses
              </Heading>
            </Link>

            {/* Add more navigation links here if needed */}
          </Flex>
          <Button
            // variant="outline"
            colorScheme="blackAlpha"
            leftIcon={<CloseIcon />}
            onClick={logout}
          >
            Logout
          </Button>
          {/* <IconButton
            colorScheme="white"
            aria-label="Open Menu"
            icon={<CloseIcon />}
            onClick={logout}
          /> */}
        </Flex>
      </Box>
    </div>
  );
};

export default Navbar;
