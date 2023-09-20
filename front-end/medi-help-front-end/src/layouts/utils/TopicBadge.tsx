import React from "react";

export const TopicBadge: React.FC<{topic: string}> = (props) => {

    return (
        <a href='#'>{props.topic}</a>
    );
};
