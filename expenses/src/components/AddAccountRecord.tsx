import {
  Modal,
  ModalOverlay,
  ModalContent,
  chakra,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Textarea,
  Progress,
} from "@chakra-ui/react";
import {
  useFrappeCreateDoc,
  useFrappeFileUpload,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
interface FormFields {
  first_name: string;
  last_name: string;
  billing_company: string;
  role: any;
  employee: string;
  phone_number: string;
  email: string;
}
export const AddAccountRecord = ({ isOpen, onClose }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FormFields>();

  const { createDoc, loading, error } = useFrappeCreateDoc();
  // console.log("error", error);

  //   employee list
  const { data: employeesList, isLoading } = useFrappeGetDocList("Employees", {
    fields: ["name", "full_name", "designation", "salary"],
  });
  if (employeesList) {
    console.log("list of employeesList", employeesList);
  }

  const onSubmit = async (data: FormFields) => {
    alert("Submitted");
    console.log(" account submitted data", data);
    createDocument(data);
  };

  const createDocument = (data: FormFields, fileUrl?: string) => {
    data.role = [
      {
        title: "Intern",
        id: "2",
      },
    ];

    createDoc("Accounts", data).then(() => {
      onClose();
    });
  };

  if (error) {
    console.log("error", error);
    alert(error.message);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  {...register("first_name", {
                    required: "First Name is required",
                    minLength: {
                      value: 1,
                      message: "First Name should be at least 1 characters",
                    },
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  {...register("last_name", {
                    required: "Last Name is required",
                    minLength: {
                      value: 1,
                      message: "Last Name should be at least 1 characters",
                    },
                  })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Billing Company</FormLabel>
                <Input
                  type="text"
                  {...register("billing_company", {
                    required: "Billing Company is required",
                    minLength: {
                      value: 1,
                      message:
                        "Billing Company should be at least 1 characters",
                    },
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Input
                  type="text"
                  {...register("role", {
                    required: "Role is required",
                    minLength: {
                      value: 1,
                      message: "Role should be at least 1 characters",
                    },
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Employee</FormLabel>

                <Select
                  {...register("employee", {
                    required: "Employee is required",
                  })}
                >
                  {employeesList?.map((e: any) => (
                    <option key={e.name} value={e.name}>
                      {e.full_name}
                    </option>
                  ))}
                  {/* <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option> */}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  {...register("phone_number", {
                    required: "Phone Number is required",
                    minLength: {
                      value: 1,
                      message: "Phone Number should be at least 1 characters",
                    },
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 1,
                      message: "Email should be at least 1 characters",
                    },
                  })}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={1} onClick={onClose}>
              Close
            </Button>
            <Button isLoading={loading} type="submit" colorScheme="blue">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </chakra.form>
    </Modal>
  );
};

// {"docstatus":0,"doctype":"Accounts","name":"new-accounts-2","__islocal":1,"__unsaved":1,"owner":"Administrator","role":[{"docstatus":0,"doctype":"Roles","name":"new-roles-3","__islocal":1,"__unsaved":1,"owner":"Administrator","parent":"new-accounts-2","parentfield":"role","parenttype":"Accounts","idx":1,"__unedited":false,"title":"ASE","id":"1"}],"first_name":"masood+","last_name":"qauser","billing_company":"mm","employee":"1","phone_number":"1111111","email":"1111111"}
