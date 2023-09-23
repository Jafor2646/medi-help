import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import {GlobalContext} from "../../Auth/GlobalContext";

export const TopicBadge: React.FC<{topic: string}> = (props) => {
    const {setglobalSearchText} = useContext(GlobalContext);
    const history = useHistory();

    const topicCLicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setglobalSearchText(props.topic);
        history.push('/search');
    }

    return (
        <a className="btn btn-primary btn-sm m-1 mb-0 mt-0" onClick={topicCLicked}>{props.topic}</a>
    );
};
