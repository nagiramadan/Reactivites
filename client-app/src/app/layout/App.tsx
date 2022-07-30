import React from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "features/activities/dashboard/ActivityDashboard";
import { Outlet, Route, Routes } from "react-router-dom";
import HomePage from "features/home/HomePage";
import ActivityForm from "features/activities/form/ActivityForm";
import ActivityDetails from "features/activities/details/ActivityDetails";
import { ToastContainer } from "react-toastify";
import NotFound from "features/errors/NotFound";
import ServerError from "features/errors/ServerError";

const PageWrapper: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </>
  );
};

const App: React.FC = () => {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PageWrapper />}>
          <Route path="activities">
            <Route index element={<ActivityDashboard />} />
            <Route path=":id" element={<ActivityDetails />} />
            <Route path="new" element={<ActivityForm key="new-activity" />} />
            <Route
              path="manage/:id"
              element={<ActivityForm key="manage-activity" />}
            />
          </Route>
          <Route path="server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
