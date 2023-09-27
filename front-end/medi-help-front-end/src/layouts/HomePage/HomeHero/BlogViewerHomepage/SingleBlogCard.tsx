import BlogViewerModel from "../../../../models/BlogViewerModel/BlogViewerModel";
import {useHistory} from "react-router-dom";
import {TopicBadge} from "../../../utils/TopicBadge";
import React, {useContext, useState} from "react";
import {GlobalContext} from "../../../../Auth/GlobalContext";

export const SingleBlogCard: React.FC<{blog: BlogViewerModel}> = (props) => {
  const {setglobalBlogId, setglobalBlogDate, setglobalUserId} = useContext(GlobalContext);

  const history = useHistory();
  let body_text: String;
  if (props.blog.blogBody.length >182){
    body_text = props.blog.blogBody.slice(0,180) + "..."
  }
  else{
    body_text = props.blog.blogBody
  }

  let userId: string = props.blog.uploaderId;
  let userDate: string = props.blog.blogDateTxt;

  let date_msg: Date = new Date(props.blog.blogDate);

  const profileCLicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setglobalUserId(userId);
    history.push('/profile');
  }

  const tlogClicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setglobalBlogId(userId);
    setglobalBlogDate(userDate);
    history.push('/blog');
  }


  return (
      <div className="card shadow text-dark mt-1 m-2  card-hover-style">
        <div className="card-body">
          <a href="#" className="text-center card-link-style" onClick={tlogClicked}>{props.blog.blogTitle}</a>
          <p className="card-text">{body_text}</p>
          <a href="#" className="username-mini-viewer" onClick={profileCLicked}>
            {props.blog.userPicture?
                <img src={props.blog.userPicture} width='20' height='20' alt="Profile Picture"/>
                :
                <img src={require('./../../../../images/Placeholder-images/placeholder-dp.png')} width='20' height='20' alt="Profile Picture"/>
            }
            <span className="m-1">
              {props.blog.userName}
            </span>
            {props.blog.userType==="Doctor"?
                <img src={require('./../../../../images/Placeholder-images/doctor-icon.png')} width='20' height='20' alt="Verified Doctor"/>
                :
                <span></span>
            }

          </a>
          <span className="m-2 text-end">{date_msg.toDateString().slice(0,3) + ',' + date_msg.toDateString().slice(3)}</span>
          {props.blog.blogTopics.slice(0,2).map(topc => <TopicBadge topic={topc}/>)}
        </div>
      </div>
  );
};
