import React from "react";
import { Message } from "semantic-ui-react";

interface Props {
    errors: string[] | null;
}

const ValidationErrors: React.FC<Props> = ({ errors }) => {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((error, index) => (
                        <Message.Item key={index}>{error}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    );
};

export default ValidationErrors;