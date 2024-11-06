import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Heading,
  IconButton,
  Link,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
  useFrappeDeleteDoc,
  useFrappeGetDoc,
} from "frappe-react-sdk";

import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import { AddAccountRecord } from "./AddAccountRecord";

interface ExpenseFields {
  name: string;
  idx: string;
  first_name: string;
  last_name: string;
  billing_company: string;
  role: any;
  employee: string;
  phone_number: string;
  email: string;
}
export const AccountListTab = () => {
  const { deleteDoc } = useFrappeDeleteDoc();
  const navigate = useNavigate();
  // Account list fetching
  const { data, isLoading, error, mutate } = useFrappeGetDocList("Accounts", {
    fields: [
      "name",
      "idx",
      "first_name",
      "last_name",
      "billing_company",
      "role",
      "employee",
      "phone_number",
      "email",
    ],
  });
  if (data) {
    console.log("list of doc", data);
  }

  //   Single account doc fetched  by id
  const { data: doc1 } = useFrappeGetDoc("Accounts", "012");

  if (doc1) {
    console.log(" doc", doc1);
  }

  //   Chakra UI Dialog box / modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   to automatically refetch a list whenever new record is created from anywhere
  useFrappeDocTypeEventListener("Expense Record", (d) => {
    console.log("Event", d);
    if (d.doctype === "Expense Record") {
      mutate();
    }
  });

  return (
    <Stack>
      <HStack justify={"space-between"}>
        <Heading as="h3" fontSize={"xl"}>
          My Accounts
        </Heading>
        <Box>
          <Button colorScheme="teal" onClick={onOpen}>
            Add
          </Button>
        </Box>
      </HStack>

      {isLoading && (
        <Center h="40vh">
          <Spinner />
        </Center>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error.exception}</AlertTitle>
          <AlertDescription>
            {error.httpStatusText} {error.httpStatus}
          </AlertDescription>
        </Alert>
      )}

      {data && (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Billing Company</Th>
              <Th>Role</Th>
              <Th>Employee</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d: ExpenseFields) => (
              <Tr key={d.name}>
                <Td>{d.name}</Td>
                <Td>{d.first_name}</Td>
                <Td>{d.last_name}</Td>
                <Td>{d.billing_company}</Td>
                <Td>{d.role}</Td>
                <Td>{d.employee}</Td>
                <Td>{d.phone_number}</Td>
                <Td>{d.email}</Td>

                <Td>
                  <ButtonGroup gap="1">
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      icon={<EditIcon />}
                      onClick={() => {
                        // console.log("d", d);
                        navigate(`/expenses/${d.first_name}`);
                      }}
                      aria-label={""}
                    />
                    <Link
                      href={`http://localhost:8000/app/print/Expense Record/${d.name}`}
                      isExternal
                    >
                      <IconButton
                        variant="ghost"
                        colorScheme="teal"
                        icon={<ExternalLinkIcon />}
                        aria-label={""} // onClick={() => {
                        //   navigate(`/expenses/${d.name}`);
                        // }}
                      />
                    </Link>
                    <IconButton
                      variant="ghost"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        deleteDoc("Expense Record", d.name)
                          .then((response) => {
                            alert(response.message);
                            mutate();
                          }) // Message will be "ok"
                          .catch((error) => console.error(error));
                      }}
                      aria-label={""}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <AddAccountRecord isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};
