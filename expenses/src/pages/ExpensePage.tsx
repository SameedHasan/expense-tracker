import {
  useFrappeDocumentEventListener,
  useFrappeGetDoc,
  useFrappeUpdateDoc,
} from "frappe-react-sdk";
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";

const ExpensePage = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isValidating, mutate, isLoading } = useFrappeGetDoc(
    "Expense Record",
    id
  );
  const { updateDoc } = useFrappeUpdateDoc();
  const [formData, setFormData] = useState({
    amount: 5000,
    description: "allowance",
    remarks: "fuel allowance",
    type: "Credit",
  });
  const userData = useUserData();
  console.log("userData", userData);
  useEffect(() => {
    if (data) {
      setFormData({
        amount: data.amount,
        description: data.description,
        remarks: data.remarks,
        type: data.type,
      });
    }
  }, [id, isLoading, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your submit logic here, e.g. sending data to a server
    updateDoc("Expense Record", id, formData)
      .then((doc) => {
        toast({
          title: "Record updated successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          variant: "left-accent",
        });
        navigate("/expenses");
      })
      .catch((error) => console.error(error));
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // useFrappeDocumentEventListener("Expense Record", { id }, (d) => {
  //   console.log("Event", d);
  //   if (d.doctype === "Expense Record") {
  //     mutate();
  //   }
  // });

  useFrappeDocumentEventListener("Expense Record", id, () => {
    mutate();
  });
  console.log("data", data, isLoading, isValidating);
  return (
    <div>
      ExpensePage: {id}
      {isLoading && (
        <Center h="40vh">
          <Spinner />
        </Center>
      )}
      {data && (
        <Box p={4} maxWidth="400px" mx="auto">
          <form onSubmit={handleSubmit}>
            <FormControl id="amount" mb={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="remarks" mb={4}>
              <FormLabel>Remarks</FormLabel>
              <Textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="type" mb={4}>
              <FormLabel>Type</FormLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
          </form>
        </Box>
      )}
    </div>
  );
};

export default ExpensePage;
