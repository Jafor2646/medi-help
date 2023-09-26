import {Link, useHistory, useLocation} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import ThreadPictureModel from "../../models/ThreadPictureModel";
import {GlobalContext} from "../../Auth/GlobalContext";
import ThreadModel from "../../models/ThreadModel";
import {TopicBadge} from "../utils/TopicBadge";
import ThreadServices from "../../Service/ThreadServices";
import ThreadPictureService from "../../Service/ThreadPictureService";
import ThreadTopicService from "../../Service/ThreadTopicService";
import {UserContext} from "../../Auth/UserContext";
import ThreadCommentService from "../../Service/ThreadCommentService";
import ThreadCommentPicturesService from "../../Service/ThreadCommentPicturesService";
export const ThreadView = () => {
    const history = useHistory();

    const {globalThreadId, globalThreadDate, setglobalUserId} = useContext(GlobalContext);
    const {current_user_id, isAuthorised}  = useContext(UserContext)

    const [pictures, setpictures] = useState<ThreadPictureModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [thread, setthread] = useState<ThreadModel>();
    const [uploaderPicture, setuploaderPicture] = useState<string>('');
    const [threadTopics, setthreadTopics] = useState<string[]>([]);
    const [threadId, setthreadId] = useState<number>();
    const [totalUpvote, settotalUpvote] = useState<number>();
    const [totalDownvote, settotalDownvote] = useState<number>();
    const [imgArray, setimgArray] = useState<any[]>([]);
    const [textBody, settextBody] = useState("");



    useEffect(() => {
        const fetchThreads = async () => {

            const baseUrl: string = "http://localhost:8080/api";

            const url: string = `${baseUrl}/threadPictures/search/findAllByThreadDateTxtAndUploaderId?uploaderId=${globalThreadId}&threadDateTxt=${globalThreadDate}`;


            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.threadPictures;

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

            setpictures(loadedPictures);
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
            let time_name = new Date(responseData.threadDate);
            let time_msg = time_name.toDateString().slice(0,3) + ',' + time_name.toDateString().slice(3)

            settotalUpvote(responseData.threadUpvote);
            settotalDownvote(responseData.threadDownvote);

            let threadLink = responseData._links.self.href.split('/');
            threadLink = threadLink[threadLink.length-1];
            let currentThreadId = Number(threadLink);
            viewAdded(currentThreadId);



            setthread(new ThreadModel(currentThreadId,responseData.uploaderId,responseData.threadTitle,responseData.threadBody,responseData.threadDate,time_msg,responseData.threadView,responseData.threadTrendView,responseData.threadUpvote,responseData.threadDownvote));

            let myLink = responseData._links.self.href.split("/");
            myLink = myLink[myLink.length-1];
            setthreadId(Number(myLink));

            const resp = await fetch(`${baseUrl}/users/search/findUserByUserId?userId=${globalThreadId}`);
            const respJson = await resp.json();
            const respData = respJson._embedded.users[0];
            setuploaderPicture(respData.picture);

            const topicResp = await fetch(`${baseUrl}/threadTopics/search/findByUploaderIdAndThreadDateTopicTxt?uploaderId=${globalThreadId}&threadDateTopicTxt=${responseData.threadDateTxt}`);
            const topicRespJson = await topicResp.json();
            const topicRespData =  topicRespJson._embedded.threadTopics;
            let topic_array: string[] = [];
            for (const topic in topicRespData){
                topic_array.push(topicRespData[topic].topicTitle);
            }
            setthreadTopics(topic_array);

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

    const upvoteClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ThreadServices.upvoteAdded(threadId).then();
        let temp = totalUpvote;
        if (temp){
            temp+=1;
            settotalUpvote(temp);
        }
        else{
            settotalUpvote(1);
        }

    }
    const downvoteClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ThreadServices.downvoteAdded(threadId).then();
        let temp = totalDownvote;
        if (temp){
            temp-=1;
            settotalDownvote(temp);
        }
        else{
            settotalDownvote(-1);
        }
    }
    function viewAdded(currentThreadId: number) {
        ThreadServices.viewAdded(currentThreadId).then();
    }

    function getBase64(file: any) {
        let tempImg: any = [];
        for(let i in imgArray) {
            tempImg.push(imgArray[i]);
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            tempImg.push(reader.result);
            setimgArray(tempImg);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    const BodyChanged = (event: React.MouseEvent<HTMLTextAreaElement>) => {
        settextBody(event.currentTarget.value);
    }

    const commentClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let date = new Date().toJSON()
        if (textBody.length>5) {
            let threadComment = {
                "replier": current_user_id,
                "commentBody": textBody,
                "threadDate": thread?.threadDate,
                "threadDateTxt": thread?.threadDateTxt,
                "commentDate": date,
                "commentDateTxt": date,
                "comment_upvote": 0,
                "comment_downvote": 0
            }
            ThreadCommentService.postThreadComment(threadComment).then();
            if (imgArray.length>0) {
                for (const key in imgArray) {
                    let threadPicture = {
                        "replier": current_user_id,
                        "threadDate": thread?.threadDate,
                        "threadDateTxt": thread?.threadDateTxt,
                        "commentDate": date,
                        "commentDateTxt": date,
                        "threadCommentSinglePicture": imgArray[key]
                    }
                    ThreadCommentPicturesService.postThreadCommentPicture(threadPicture).then();
                }
            }
            setimgArray([]);
            settextBody("");

        }
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
                            <span className="post-date m-3">{thread?.threadDateTxt}</span>
                        </div>
                        <h3 className="mt-3">{thread?.threadTitle}</h3>
                        <p>{thread?.threadBody}</p>
                        <div className="thread-images">
                            {pictures.length>0?
                                pictures.map(picture => (
                                    <img className="ms-2 mt-2" src={picture.threadSinglePicture} alt="Thread Picture" height="200"/>
                                    ))
                                :
                                <span></span>
                            }
                        </div>
                        <hr/>
                        <div className="thread-actions">
                            <button className="btn btn-sm vote-button"  onClick={upvoteClicked}><img src={require("./../../images/ThreadView-image/upvote.png")} height="30"/><span className='m-1'>{totalUpvote}</span></button>
                            <button className="btn btn-sm vote-button"  onClick={downvoteClicked}><img src={require("./../../images/ThreadView-image/downvote.png")} height="30"/><span className='m-1'>{totalDownvote}</span></button>
                            <span className="mt-2">
                                {threadTopics.slice(0,3).map(topc => <TopicBadge topic={topc}/>)}
                            </span>
                        </div>
                    </div>
                </div>



                {isAuthorised=='true'&&
                    <div className="card mt-3 shadow bg-black-50">
                        <div className="mb-1 ms-1 me-1 mt-1">
                            <textarea className="form-control shadow" id="textBody" maxLength={60000} rows={7} placeholder="Write something..." onInput={BodyChanged}></textarea>
                        </div>


                        <div className="d-flex">

                            {imgArray.length>0 &&
                                imgArray.map(ig => (
                                    <div>
                                        <img className='m-1' src={ig} alt="Thread Image" height={60} width={60}/>
                                    </div>
                                ))
                            }


                            {imgArray.length<=2&&
                                <div>
                                    <label className="form-label text-white m-1" htmlFor="customFile1">
                                        <div className="add-image"></div>
                                    </label>
                                    <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control d-none"
                                           id="customFile1"  onChange={(event) => {

                                        if (event.target.files){
                                            getBase64(event.target.files[0])
                                        }
                                    }}/>
                                </div>
                            }
                            <button type="button" className="btn btn-sm btn-outline-success ms-auto mb-3 mt-2 me-1 ps-3 pe-3 pt-0 pb-0" onClick={commentClicked}>
                                Comment
                            </button>
                        </div>
                </div>
                }





















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