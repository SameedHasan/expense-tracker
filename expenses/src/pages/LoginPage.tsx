import { useFrappeAuth } from "frappe-react-sdk";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserProvider";

const LoginPage = () => {
  // const { currentUser, isLoading, login } = useFrappeAuth();
  const { login, currentUser, isLoading, getUserCookie } =
    useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      console.log("getUserCookie", getUserCookie);
      navigate("/expenses", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleLogin = async () => {
    if (email === "administrator" && password === "admin") {
      await login(email, password);
      // Successful login
      toast({
        title: "Welcome Back!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    } else {
      login(email, password).catch((error) => {
        alert(error.message);
      });
      // Login error
    }
  };

  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bg="#f7f7f7"
      >
        <Box
          p={6}
          bg="white"
          boxShadow="lg"
          rounded="md"
          maxWidth="400px"
          width="100%"
        >
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleLogin}>
            Log in
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
