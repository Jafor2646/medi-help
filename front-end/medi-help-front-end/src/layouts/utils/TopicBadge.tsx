import React from "react";
import {Link} from "react-router-dom";

export const TopicBadge: React.FC<{topic: string}> = (props) => {

    return (
        <Link className="btn btn-primary btn-sm m-1 mb-0 mt-0" to={{pathname: "/search", state: {props}}}>{props.topic}</Link>
    );
};
