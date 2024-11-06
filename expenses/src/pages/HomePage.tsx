import { useFrappeGetCall, useFrappeGetDocList } from "frappe-react-sdk";
import {
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
const HomePage = () => {
  // Getting list of Modules Def
  const { data, isLoading } = useFrappeGetDocList("Module Def", {
    fields: ["*"],
    filters: [["app_name", "=", "expense_tracker"]],
  });

  // Getting Side bar Items
  const { data: d4 } = useFrappeGetCall(
    "frappe.desk.desktop.get_workspace_sidebar_items"
  );
  console.log("d4", d4);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Home Page - Module Def</h1>

      <div>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Table Caption</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Creation</Th>
              <Th>Modified</Th>
              <Th>Modified By</Th>
              <Th>Owner</Th>
              <Th>Doc Status</Th>
              <Th>Module Name</Th>
              <Th>Custom</Th>
              <Th>Package</Th>
              <Th>App Name</Th>
              <Th>Restrict To Domain</Th>
              <Th>User Tags</Th>
              <Th>Comments</Th>
              <Th>Assign</Th>
              <Th>Liked By</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.creation}</Td>
                <Td>{item.modified}</Td>
                <Td>{item.modified_by}</Td>
                <Td>{item.owner}</Td>
                <Td>{item.docstatus}</Td>
                <Td>{item.module_name}</Td>
                <Td>{item.custom}</Td>
                <Td>{item.package}</Td>
                <Td>{item.app_name}</Td>
                <Td>{item.restrict_to_domain}</Td>
                <Td>{item._user_tags}</Td>
                <Td>{item._comments}</Td>
                <Td>{item._assign}</Td>
                <Td>{item._liked_by}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default HomePage;

[
  {
    name: "Estate App-Administrator",
    title: "Estate App",
    for_user: "Administrator",
    parent_page: "",
    content:
      '[{"id":"Xt3JIS9upV","type":"header","data":{"text":"<span class=\\"h4\\">Estate App</span>","col":12}},{"id":"SMv_o1EiQ_","type":"card","data":{"card_name":"Estate App","col":4}}]',
    public: 0,
    module: null,
    icon: "retail",
    is_hidden: 1,
    label: "Estate App-Administrator",
  },
  {
    name: "Expense Tracker-Administrator",
    title: "Expense Tracker",
    for_user: "Administrator",
    parent_page: "",
    content:
      '[{"id":"mClcKth35W","type":"header","data":{"text":"<span class=\\"h4\\">Expense Tracker</span>","col":12}},{"id":"Zz1Zdp-rwO","type":"card","data":{"card_name":"Expenses","col":4}}]',
    public: 0,
    module: null,
    icon: "milestone",
    is_hidden: 0,
    label: "Expense Tracker-Administrator",
  },
  {
    name: "Raven-Administrator",
    title: "Raven",
    for_user: "Administrator",
    parent_page: "",
    content:
      '[{"id":"11WaEwxOO_","type":"header","data":{"text":"<span class=\\"h4\\">Raven</span>","col":12}},{"id":"z_i5q6DcTw","type":"card","data":{"card_name":"Raven Channel Management","col":4}},{"id":"Y-TnScbgFZ","type":"card","data":{"card_name":"Raven Messaging","col":4}}]',
    public: 0,
    module: null,
    icon: "mail",
    is_hidden: 0,
    label: "Raven-Administrator",
  },
  {
    name: "Pos Awesome -Administrator",
    title: "Pos Awesome ",
    for_user: "Administrator",
    parent_page: "",
    content:
      '[{"id":"CQMcYYVDRs","type":"header","data":{"text":"<span class=\\"h4\\">Pos Awesome </span>","col":12}}]',
    public: 0,
    module: null,
    icon: "image-view",
    is_hidden: 0,
    label: "Pos Awesome -Administrator",
  },
];
