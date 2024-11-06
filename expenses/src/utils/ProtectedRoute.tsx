import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FullPageLoader } from "../../components/layout/Loaders";
import { UserContext } from "./UserProvider";
import MainLayout from "../layout/MainLayout";

type Props = {};

export const ProtectedRoute = (props: Props) => {
  const { currentUser, isLoading } = useContext(UserContext);
  //   const currentUser = "Admin";
  //   const isLoading = false;

  if (isLoading) {
    return <h1>Loading</h1>;
  } else if (!currentUser || currentUser === "Guest") {
    return <Navigate to="/login" />;
  }
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
