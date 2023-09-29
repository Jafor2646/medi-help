import {useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../Auth/GlobalContext";
import BLogCommentModel from "../../models/BLogCommentModel";

export const SingleBlogComment: React.FC<{comments: BLogCommentModel}> = (props) => {
  const {setglobalBlogId, setglobalBlogDate, setglobalUserId} = useContext(GlobalContext);
  const [commenterDp, setcommenterDp] = useState<string>();
  const [commenterType, setcommenterType] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [imgArray, setimgArray] = useState<string[]>([]);

  const history = useHistory();
  let userId = props.comments.replier;

  let date_msg: Date = new Date(props.comments.commentDate);

  useEffect(() => {
    const fetchBlogs = async () => {
      const baseUrl: string = "http://localhost:8080/api";


      const url: string = `${baseUrl}/users/search/findUserByUserId?userId=${props.comments.replier}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.users[0];

      setcommenterDp(responseData.picture);
      setcommenterType(responseData.userType);

      setIsLoading(false);
    };
    fetchBlogs().catch((error: any) => {
      setHttpError(error.message);
    })
    // window.scrollTo(0, 0);
  }, []);


  // img download
  useEffect(() => {
    const fetchBlogs = async () => {
      const baseUrl: string = "http://localhost:8080/api";


      const url: string = `${baseUrl}/blogCommentPictures/search/findAllByBlogCommentId?blogCommentId=${props.comments.blogCommentId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.blogCommentPictures;

      let tempImgArray: string[] = [];

      for (const key in responseData){
        tempImgArray.push(
            responseData[key].blogCommentSinglePicture
        )
      }
      setimgArray(tempImgArray);

      setIsLoading(false);
    };
    fetchBlogs().catch((error: any) => {
      setHttpError(error.message);
    })
    // window.scrollTo(0, 0);
  }, [imgArray]);


  const profileCLicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setglobalUserId(userId);
    history.push('/profile');
  }


  return (
      <div className="card shadow text-dark mt-1 m-2  card-hover-style">
        <div className="card-body">
          <a href="#" className="username-mini-viewer" onClick={profileCLicked}>
            {commenterDp?
                <img src={commenterDp} width='20' height='20' alt="Profile Picture"/>
                :
                <img src={require('./../../images/Placeholder-images/placeholder-dp.png')} width='20' height='20' alt="Profile Picture"/>
            }
            <span className="m-1">
              {userId}
            </span>
            {commenterType==="Doctor"?
                <img src={require('./../../images/Placeholder-images/doctor-icon.png')} width='20' height='20' alt="Verified Doctor"/>
                :
                <span></span>
            }

          </a>
          <span className="m-2 text-end">{date_msg.toDateString().slice(0,3) + ',' + date_msg.toDateString().slice(3)}</span>

          <p className="card-text">{props.comments.commentBody}</p>
          <div className="thread-images">
            {imgArray.length>0&&
                imgArray.map(picture => (
                    <img className="ms-2 mt-2" src={picture} alt="Thread Comment Picture" height="100"/>
                ))
            }
          </div>
        </div>
      </div>
  );
};
