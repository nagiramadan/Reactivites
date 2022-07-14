import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityList: React.FC = () => {
    const [target, setTarget] = useState('');
    const { activityStore } = useStore();

    const handleDelete = (id: string) => {
        setTarget(id);
        activityStore.deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activityStore.activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city} , {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content="View" color="blue" onClick={() => activityStore.selectActivity(activity.id)}/>
                                <Button loading={activityStore.loading && target === activity.id}  floated="right" content="Delete" color="red" onClick={() => handleDelete(activity.id)}/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
};

export default observer(ActivityList);