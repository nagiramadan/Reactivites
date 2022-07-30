import React, { useEffect } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingComponent from "app/layout/LoadingComponent";
import { Activity } from "app/models/activity";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "app/common/form/TextInput";
import SelectInput from "app/common/form/SelectInput";
import { categoryOptions } from "app/common/options/categoryOptions";
import DateInput from "app/common/form/DateInput";
import TextAreaInput from "app/common/form/TextAreaInput";

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
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
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

    const handleSubmit = (activity: Activity) => {
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

    if (loadingInitial) {
        return <LoadingComponent />;
    }

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik 
                validationSchema={validationSchema}
                initialValues={activity} 
                enableReinitialize={true} 
                onSubmit={handleSubmit}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <TextInput placeholder="Title" name='title' />
                        <TextAreaInput rows={3} placeholder="Description" name='description' />
                        <SelectInput options={categoryOptions} placeholder="Category" name='category' />
                        <DateInput 
                            placeholderText="Date" 
                            name='date' 
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content="Location Details" sub color="teal" />
                        <TextInput placeholder="City" name='city' />
                        <TextInput placeholder="Venue" name='venue' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} 
                            floated="right" 
                            positive type="submit" content="Submit"/>
                        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel"/>
                    </Form>
                )}
            </Formik>
        </Segment>
    );
}

export default observer(ActivityForm);