import React from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "features/activities/dashboard/ActivityDashboard";
import { Outlet, Route, Routes } from "react-router-dom";
import HomePage from "features/home/HomePage";
import ActivityForm from "features/activities/form/ActivityForm";
import ActivityDetails from "features/activities/details/ActivityDetails";

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="activities" element={<PageWrapper />}>
          <Route index element={<ActivityDashboard />} />
          <Route path=":id" element={<ActivityDetails />} />
          <Route path="new" element={<ActivityForm key="new-activity" />} />
          <Route
            path="manage/:id"
            element={<ActivityForm key="manage-activity" />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
