import { useStore } from "app/stores/store";
import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

const NavBar: React.FC = () => {
    const { activityStore } = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
                    Reactivites
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={() => activityStore.openForm()}/>
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default NavBar;