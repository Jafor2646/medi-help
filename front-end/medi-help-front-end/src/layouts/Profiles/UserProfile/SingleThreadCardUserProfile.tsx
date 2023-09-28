import ThreadViewerModel from "../../../models/ThreadViewerModel/ThreadViewerModel";
import {useHistory} from "react-router-dom";
import {TopicBadge} from "../../utils/TopicBadge";
import React, {useContext, useState} from "react";
import {GlobalContext} from "../../../Auth/GlobalContext";

export const SingleThreadCardUserProfile: React.FC<{thread: ThreadViewerModel}> = (props) => {
  const {setglobalThreadId, setglobalThreadDate, setglobalUserId} = useContext(GlobalContext);

  const history = useHistory();
  let body_text: String;
  if (props.thread.threadBody.length >182){
    body_text = props.thread.threadBody.slice(0,180) + "..."
  }
  else{
    body_text = props.thread.threadBody
  }

  let userId: string = props.thread.uploaderId;
  let userDate: string = props.thread.threadDateTxt;

  let date_msg: Date = new Date(props.thread.threadDate);

  const profileCLicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setglobalUserId(userId);
    history.push('/profile');
  }

  const threadClicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setglobalThreadId(userId);
    setglobalThreadDate(userDate);
    history.push('/thread');
  }


  return (
      <div className="card shadow text-dark mt-1 m-2  card-hover-style">
        <div className="card-body">
          <a href="#" className="text-center card-link-style" onClick={threadClicked}>{props.thread.threadTitle}</a>
          <p className="card-text">{body_text}</p>
          <a href="#" className="username-mini-viewer" onClick={profileCLicked}>
            {props.thread.userPicture?
                <img src={props.thread.userPicture} width='20' height='20' alt="Profile Picture"/>
                :
                <img src={require('./../../../images/Placeholder-images/placeholder-dp.png')} width='20' height='20' alt="Profile Picture"/>
            }
            <span className="m-1">
              {props.thread.userName}
            </span>
            {props.thread.userType==="Doctor"?
                <img src={require('./../../../images/Placeholder-images/doctor-icon.png')} width='20' height='20' alt="Verified Doctor"/>
                :
                <span></span>
            }

          </a>
          <span className="m-2 text-end">{date_msg.toDateString().slice(0,3) + ',' + date_msg.toDateString().slice(3)}</span>
          {props.thread.threadTopics.slice(0,2).map(topc => <TopicBadge topic={topc}/>)}
        </div>
      </div>
  );
};
