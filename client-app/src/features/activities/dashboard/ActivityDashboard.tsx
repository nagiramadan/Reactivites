import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

const ActivityDashboard: React.FC = () => {
  const { activityStore } = useStore();
  
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading app" />;
  }
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
