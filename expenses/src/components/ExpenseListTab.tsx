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
  useFrappeGetCall,
} from "frappe-react-sdk";
import { AddExpenseRecord } from "./AddExpenseRecord";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Search } from "./Search";

interface ExpenseFields {
  name: string;
  formatted_amount: string;
  type: string;
  description: string;
  remarks: string;
  owner: string;
  file: string;
}
export const ExpenseListTab = () => {
  const { deleteDoc } = useFrappeDeleteDoc();
  const navigate = useNavigate();

  const { data, isLoading, error, mutate } = useFrappeGetDocList(
    "Expense Record",
    {
      fields: [
        "name",
        "formatted_amount",
        "type",
        "description",
        "remarks",
        "owner",
        "file",
        "abc",
        "modified_by",
      ],
    }
  );

  const { data: numberCard } = useFrappeGetDoc("DocType", "Expense Record");
  if (numberCard) {
    // console.log("Expense Record", numberCard);
  }

  const { data: numberCard1 } = useFrappeGetDoc("Expense Record", "T-00008");
  const { data: d3 } = useFrappeGetCall(
    "frappe.desk.form.load.getdoc?doctype=Expense%20Record&name=T-00008&_=1693832799047",
    {
      doc: numberCard1,
      filters: numberCard1?.filters_json,
    },
    numberCard1 ? undefined : null
  );
  if (numberCard1) {
    // console.log("Expense Record Form", d3);
  }

  if (data) {
    // console.log("list of doc", data);
  }

  // Report data getting
  const { data: d4 } = useFrappeGetCall("frappe.desk.reportview.get", {
    doctype: "Expense Record",
    // fields: "description",
    filters: { name: "T-00008" },
    fields: JSON.stringify(["name", "description"]),
    view: "Report",
  });
  if (d4) {
    // console.log("Expense Record Report", d4);
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
          My Expenses
        </Heading>
        <Box>
          <Search />
        </Box>
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
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Remarks</Th>
              <Th>Owner</Th>
              <Th>File</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d: ExpenseFields) => (
              <Tr key={d.name}>
                <Td>{d.name}</Td>
                <Td>{d.description}</Td>
                <Td color={d.type === "Credit" ? "green" : "red"}>
                  {d.formatted_amount}
                </Td>
                <Td>{d.type}</Td>
                <Td>{d.remarks}</Td>
                <Td>{d.owner}</Td>
                <Td>
                  {d.file && (
                    <Link isExternal href={d.file}>
                      Download
                    </Link>
                  )}
                </Td>
                <Td>
                  <ButtonGroup gap="1">
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      icon={<EditIcon />}
                      onClick={() => {
                        // console.log("d", d);
                        navigate(`/expenses/${d.name}`);
                      }}
                    />
                    <Link
                      href={`http://localhost:8000/app/print/Expense Record/${d.name}`}
                      isExternal
                    >
                      <IconButton
                        variant="ghost"
                        colorScheme="teal"
                        icon={<ExternalLinkIcon />}
                        // onClick={() => {
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
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <AddExpenseRecord isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};
