import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ExpenseListTab } from "../components/ExpenseListTab.tsx";
import { Dashboard } from "../components/Dashboard.tsx";

export const AccountsPage = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Expense List</Tab>
        <Tab>Dashboard</Tab>
        <Tab>Accounts</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ExpenseListTab />
        </TabPanel>
        <TabPanel>
          <Dashboard />
        </TabPanel>
        <TabPanel>
          <Dashboard />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
