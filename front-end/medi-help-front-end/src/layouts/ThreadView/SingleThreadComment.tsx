import {useHistory} from "react-router-dom";
import React, {useContext, useState} from "react";
import {GlobalContext} from "../../Auth/GlobalContext";
import ThreadCommentModel from "../../models/ThreadCommentModel";

export const SingleThreadComment: React.FC<{comments: ThreadCommentModel}> = (props) => {
  const {setglobalThreadId, setglobalThreadDate, setglobalUserId} = useContext(GlobalContext);

  const history = useHistory();

  let userId: string = props.comments.replier;
  let userDate: string = props.comments.commentDateTxt;

  let date_msg: Date = new Date(props.comments.commentDate);

  const profileCLicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setglobalUserId(userId);
    history.push('/profile');
  }


  return (
      <div className="card shadow text-dark mt-1 m-2  card-hover-style">
        <div className="card-body">
          <p className="card-text">{props.comments.commentBody}</p>
          <a href="#" className="username-mini-viewer" onClick={profileCLicked}>
            {/*{props.comments.userPicture?*/}
            {/*    <img src={props.thread.userPicture} width='20' height='20' alt="Profile Picture"/>*/}
            {/*    :*/}
            {/*    <img src={require('./../../../../images/Placeholder-images/placeholder-dp.png')} width='20' height='20' alt="Profile Picture"/>*/}
            {/*}*/}
            <span className="m-1">
              {userId}
            </span>
            {/*{props.thread.userType==="Doctor"?*/}
            {/*    <img src={require('./../../../../images/Placeholder-images/doctor-icon.png')} width='20' height='20' alt="Verified Doctor"/>*/}
            {/*    :*/}
            {/*    <span></span>*/}
            {/*}*/}

          </a>
          <span className="m-2 text-end">{date_msg.toDateString().slice(0,3) + ',' + date_msg.toDateString().slice(3)}</span>
        </div>
      </div>
  );
};
