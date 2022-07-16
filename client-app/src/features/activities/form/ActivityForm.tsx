import React, { ChangeEvent, useEffect } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingComponent from "app/layout/LoadingComponent";
import { Activity } from "app/models/activity";
import { v4 as uuid } from "uuid";

const ActivityForm: React.FC= () => {
    const { activityStore } = useStore();
    const { selectedActivity, loading, loadingInitial, createActivity, updateActivity } = activityStore;
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) {
            activityStore.loadActivity(id);
        }
    }, [id]);

    useEffect(() => {
        if(id && selectedActivity) {
            setActivity(selectedActivity);
        }
    }, [id, selectedActivity]);

    const handleSubmit = () => {
        if(activity.id.length === 0) {
            const newActivity = {...activity, id: uuid()};
            createActivity(newActivity).then(() => {
                navigate(`/activities/${newActivity.id}`);
            });
        } else {
            updateActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            });
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if (loadingInitial) {
        return <LoadingComponent />;
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type="date" placeholder="Date" value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                <Button as={Link} to="/activities" floated="right" type="button" content="Cancel"/>
            </Form>
        </Segment>
    );
}

export default observer(ActivityForm);