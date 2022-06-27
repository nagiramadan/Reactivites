import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header, List } from 'semantic-ui-react';
import axios from 'axios';

function App() {

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Activities').then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Header as="h2" icon="users" content="Reactivities"/>
        <List>
          {
            activities.map(item => (
              <List.Item key={item.id}>{item.title}</List.Item>
            ))
          }
        </List>
    </div>
  );
}

export default App;
