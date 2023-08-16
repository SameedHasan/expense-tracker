import {
  Card,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useFrappeGetCall, useFrappeGetDoc } from "frappe-react-sdk";

export const Dashboard = () => {
  // Get the number card doctype's (Cards) Doc
  const { data: numberCard } = useFrappeGetDoc("Number Card", "Total Credits");
  const { data: totalDebits } = useFrappeGetDoc("Number Card", "Total Debits");
  console.log("numberCard", numberCard);
  console.log("totalDebits", totalDebits);

  //video 1:42
  const { data } = useFrappeGetCall(
    "frappe.desk.doctype.number_card.number_card.get_result",
    {
      doc: numberCard,
      filters: numberCard?.filters_json,
    },
    numberCard ? undefined : null
  );

  const { data: data1 } = useFrappeGetCall(
    "frappe.desk.doctype.number_card.number_card.get_result",
    {
      doc: totalDebits,
      filters: totalDebits?.filters_json,
    },
    totalDebits ? undefined : null
  );

  return (
    <>
      <h1>DashBoard</h1>
      <SimpleGrid columns={8} spacing={4}>
        <Card p="4">
          <Stat>
            <StatLabel>Total Credits</StatLabel>
            <StatNumber>{data?.message}</StatNumber>
          </Stat>
        </Card>
        <Card p="4">
          <Stat>
            <StatLabel>Total Debits</StatLabel>
            <StatNumber>{data1?.message}</StatNumber>
          </Stat>
        </Card>
      </SimpleGrid>
    </>
  );
};
