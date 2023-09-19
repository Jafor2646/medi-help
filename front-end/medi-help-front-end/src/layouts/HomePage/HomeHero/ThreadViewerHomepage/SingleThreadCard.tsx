import ThreadModel from "../../../../models/ThreadModel";
import React, {useEffect, useState} from "react";

export const SingleThreadCard: React.FC<{thread: ThreadModel}> = (props) => {
  let body_text: String;
  if (props.thread.threadBody.length >182){
    body_text = props.thread.threadBody.slice(0,180) + "..."
  }
  else{
    body_text = props.thread.threadBody
  }

  let date_msg: Date = new Date(props.thread.threadDate);

  return (
      <div className="card shadow bg-white text-dark mt-1 m-2">
        <div className="card-body card-hover-style">
          <a href="#" className="text-center card-link-style">{props.thread.threadTitle}</a>
          <p className="card-text">{body_text}</p>
          <a href="#" className="username-mini-viewer">{props.thread.uploaderId}</a>
          <span className="m-2 text-end">{"Posted: " + date_msg.toUTCString()}</span>
        </div>
      </div>
  );
};
