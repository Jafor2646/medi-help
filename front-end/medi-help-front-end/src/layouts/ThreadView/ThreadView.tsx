import {Link, useHistory, useLocation} from "react-router-dom";
import ThreadViewerModel from "../../models/ThreadViewerModel/ThreadViewerModel";
import React, {useContext, useEffect, useState} from "react";
import ThreadPictureModel from "../../models/ThreadPictureModel";
import {SingleThreadCard} from "../HomePage/HomeHero/ThreadViewerHomepage/SingleThreadCard";
import {GlobalContext} from "../../Auth/GlobalContext";
import ThreadModel from "../../models/ThreadModel";
export const ThreadView = () => {
    const history = useHistory();

    const {globalThreadId, globalThreadDate, setglobalUserId} = useContext(GlobalContext);

    const [pictures, setPictures] = useState<ThreadPictureModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [thread, setthread] = useState<ThreadModel>();
    const [uploaderPicture, setuploaderPicture] = useState<string>('');

    useEffect(() => {
        const fetchThreads = async () => {

            const baseUrl: string = "http://localhost:8080/api";

            const url: string = `${baseUrl}/threadPictures/search/findAllByThreadDateTxtAndUploaderId?uploaderId=${globalThreadId}&threadDateTxt=${globalThreadDate}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.threadpictures;

            const loadedPictures: ThreadPictureModel[] = [];

            for (const key in responseData) {

                loadedPictures.push({
                    uploaderId: responseData[key].uploaderId,
                    pictureId: responseData[key].pictureId,
                    threadDate: responseData[key].threadDate,
                    threadDateTxt: responseData[key].threadDateTxt,
                    threadSinglePicture: responseData[key].threadSinglePicture
                });
            }

            setPictures(loadedPictures);
            setIsLoading(false);
        };
        fetchThreads().catch((error: any) => {
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchThreads = async () => {

            const baseUrl: string = "http://localhost:8080/api";

            const url: string = `${baseUrl}/threads/search/findByUploaderIdAndThreadDateTxt?uploaderId=${globalThreadId}&threadDateTxt=${globalThreadDate}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.threads[0];

            setthread(new ThreadModel(responseData.uploaderId,responseData.threadTitle,responseData.threadBody,responseData.threadDate,responseData.threadDateTxt,responseData.threadView,responseData.threadTrendView,responseData.threadUpvote,responseData.threadDownvote));

            const resp = await fetch(`${baseUrl}/users/search/findUserByUserId?userId=${globalThreadId}`);
            const respJson = await resp.json();
            const respData = respJson._embedded.users[0];
            setuploaderPicture(respData.picture);

            setIsLoading(false);
        };
        fetchThreads().catch((error: any) => {
            setHttpError(error.message);
        })
    }, []);

    const UploaderProfileClicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setglobalUserId(globalThreadId);
        history.push('/profile');
    }

    return (
        <div>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <div className="user-info">
                            <a href='#' className="username-mini-viewer" onClick={UploaderProfileClicked}>
                                {uploaderPicture?
                                    <img src={uploaderPicture} alt="Profile Picture" width='30' height='30' />
                                    :
                                    <img src={require('./../../images/Placeholder-images/placeholder-dp.png')} alt="Profile Picture" className="rounded-circle" width="50" />
                                }
                                <span className="m-2">{globalThreadId}</span>
                            </a>
                        </div>
                        <h3 className="mt-3">{thread?.threadTitle}</h3>
                        <p>{thread?.threadBody}</p>
                        <div className="thread-images">
                            {pictures.length>0?
                                pictures.map(picture => (
                                    <img src={picture.threadSinglePicture} alt="Thread Picture" width="100" height="100"/>
                                    ))
                                :
                                <span></span>
                            }
                        </div>
                        <div className="thread-actions mt-3">
                            <button className="btn btn-sm btn-primary">Upvote</button>
                            <button className="btn btn-sm btn-danger">Downvote</button>
                        </div>
                        <div className="post-info mt-3">
                            <span className="post-date">September 21, 2023</span>
                            <div className="mt-2">
                                <Link to="/React" className="btn btn-sm">React</Link>
                                <Link to="/Thread" className="btn btn-sm">Thread</Link>
                                <Link to="/StaticPage" className="btn btn-sm">Static Page</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-body">
                        <div className="comment">
                            <div className="comment-user">
                                <img src={require('./../../images/ThreadView-image/CommentDp.jpg')} alt="Profile" className="rounded-circle" width="40" />
                                <span className="ml-2">Alice Smith</span>
                                <span className="comment-date ml-2">September 22, 2023</span>
                            </div>
                            <p>Nice thread!</p>
                            <div className="comment-images">
                            </div>
                            <div className="comment-actions mt-2">
                                <button className="btn btn-sm btn-primary">Upvote</button>
                                <button className="btn btn-sm btn-danger">Downvote</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-body">
                        <div className="comment">
                            <div className="comment-user">
                                <img src={require('./../../images/ThreadView-image/ThreadDp.jpg')} alt="Profile" className="rounded-circle" width="40" />
                                <span className="ml-2">Bob Johnson</span>
                                <span className="comment-date ml-2">September 23, 2023</span>
                            </div>
                            <p>I have a question...</p>
                            <div className="comment-images">
                                <img src={require('./../../images/ThreadView-image/body3.jpeg')} alt="Question Image" className="img-fluid" />
                            </div>
                            <div className="comment-actions mt-2">
                                <button className="btn btn-sm btn-primary">Upvote</button>
                                <button className="btn btn-sm btn-danger">Downvote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};