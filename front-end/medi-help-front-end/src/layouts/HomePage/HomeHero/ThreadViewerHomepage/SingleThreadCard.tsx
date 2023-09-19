import ThreadViewerModel from "../../../../models/ThreadViewerModel/ThreadViewerModel";

export const SingleThreadCard: React.FC<{thread: ThreadViewerModel}> = (props) => {
  let body_text: String;
  if (props.thread.threadBody.length >182){
    body_text = props.thread.threadBody.slice(0,180) + "..."
  }
  else{
    body_text = props.thread.threadBody
  }

  let date_msg: Date = new Date(props.thread.threadDate);

  return (
      <div className="card shadow text-dark mt-1 m-2  card-hover-style">
        <div className="card-body">
          <a href="#" className="text-center card-link-style">{props.thread.threadTitle}</a>
          <p className="card-text">{body_text}</p>
          <a href="#" className="username-mini-viewer">
            {props.thread.userPicture?
                <img src={props.thread.userPicture} width='20' height='20' alt="Profile Picture"/>
                :
                <img src={require('./../../../../images/Placeholder-images/placeholder-dp.png')} width='20' height='20' alt="Profile Picture"/>
            }
            <span className="m-1">
              {props.thread.userName}
            </span>
          </a>
          <span className="m-2 text-end">{"Posted: " + date_msg.toDateString().slice(0,3) + ',' + date_msg.toDateString().slice(3)}</span>
        </div>
      </div>
  );
};
