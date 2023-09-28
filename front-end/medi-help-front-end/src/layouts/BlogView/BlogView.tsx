import {Link, useHistory, useLocation} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import BlogPictureModel from "../../models/BlogPictureModel";
import {GlobalContext} from "../../Auth/GlobalContext";
import BlogModel from "../../models/BlogModel";
import {TopicBadge} from "../utils/TopicBadge";
import BlogServices from "../../Service/BlogServices";
import BlogPictureService from "../../Service/BlogPictureService";
import BlogTopicService from "../../Service/BlogTopicService";
import {UserContext} from "../../Auth/UserContext";
import BlogCommentService from "../../Service/BlogCommentService";
import BlogCommentPicturesService from "../../Service/BlogCommentPicturesService";
import {SingleBlogComment} from "./SingleBlogComment";
import {BlogComment} from "./BlogComment";
export const BlogView = () => {
    const history = useHistory();

    const {globalBlogId, globalBlogDate, setglobalUserId} = useContext(GlobalContext);
    const {current_user_id, isAuthorised}  = useContext(UserContext)

    const [pictures, setpictures] = useState<BlogPictureModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [blog, setblog] = useState<BlogModel>();
    const [uploaderPicture, setuploaderPicture] = useState<string>('');
    const [blogTopics, setblogTopics] = useState<string[]>([]);
    const [blogId, setblogId] = useState<number>();
    const [totalUpvote, settotalUpvote] = useState<number>();
    const [totalDownvote, settotalDownvote] = useState<number>();
    const [imgArray, setimgArray] = useState<any[]>([]);
    const [textBody, settextBody] = useState("");



    useEffect(() => {
        const fetchBlogs = async () => {

            const baseUrl: string = "http://localhost:8080/api";

            const url: string = `${baseUrl}/blogPictures/search/findAllByblogDateTxtAndUploaderId?uploaderId=${globalBlogId}&blogDateTxt=${globalBlogDate}`;


            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.blogPictures;

            const loadedPictures: BlogPictureModel[] = [];


            for (const key in responseData) {

                loadedPictures.push({
                    uploaderId: responseData[key].uploaderId,
                    pictureId: responseData[key].pictureId,
                    blogDate: responseData[key].blogDate,
                    blogDateTxt: responseData[key].blogDateTxt,
                    blogSinglePicture: responseData[key].blogSinglePicture
                });
            }

            setpictures(loadedPictures);
            setIsLoading(false);
        };
        fetchBlogs().catch((error: any) => {
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {

            const baseUrl: string = "http://localhost:8080/api";

            const url: string = `${baseUrl}/blogs/search/findByUploaderIdAndBlogDateTxt?uploaderId=${globalBlogId}&blogDateTxt=${globalBlogDate}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.blogs[0];
            let time_name = new Date(responseData.blogDate);
            let time_msg = time_name.toDateString().slice(0,3) + ',' + time_name.toDateString().slice(3)

            settotalUpvote(responseData.blogUpvote);
            settotalDownvote(responseData.blogDownvote);

            let blogLink = responseData._links.self.href.split('/');
            blogLink = blogLink[blogLink.length-1];
            let currentBlogId = Number(blogLink);
            viewAdded(currentBlogId);
            setblogId(currentBlogId);



            setblog(new BlogModel(currentBlogId,responseData.uploaderId,responseData.blogTitle,responseData.blogBody,responseData.blogDate,time_msg,responseData.blogView,responseData.blogTrendView,responseData.blogUpvote,responseData.blogDownvote));


            const resp = await fetch(`${baseUrl}/users/search/findUserByUserId?userId=${globalBlogId}`);
            const respJson = await resp.json();
            const respData = respJson.embedded.users[0];
            setuploaderPicture(respData.picture);

            const topicResp = await fetch(`${baseUrl}/blogTopics/search/findByUploaderIdAndBlogDateTopicTxt?uploaderId=${globalBlogId}&blogDateTopicTxt=${responseData.blogDateTxt}`);
            const topicRespJson = await topicResp.json();
            const topicRespData =  topicRespJson._embedded.blogTopics;
            let topic_array: string[] = [];
            for (const topic in topicRespData){
                topic_array.push(topicRespData[topic].topicTitle);
            }
            setblogTopics(topic_array);

            setIsLoading(false);
        };
        fetchBlogs().catch((error: any) => {
            setHttpError(error.message);
        })
    }, [blogId]);

    const UploaderProfileClicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setglobalUserId(globalBlogId);
        history.push('/profile');
    }

    const upvoteClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        BlogServices.upvoteAdded(blogId).then();
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
        BlogServices.downvoteAdded(blogId).then();
        let temp = totalDownvote;
        if (temp){
            temp-=1;
            settotalDownvote(temp);
        }
        else{
            settotalDownvote(-1);
        }
    }
    function viewAdded(currentBlogId: number) {
        BlogServices.viewAdded(currentBlogId).then();
    }

    // function getBase64(file: any) {
    //     let tempImg: any = [];
    //     for(let i in imgArray) {
    //         tempImg.push(imgArray[i]);
    //     }
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //         tempImg.push(reader.result);
    //         setimgArray(tempImg);
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error', error);
    //     }
    // }
    //
    // const BodyChanged = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    //     settextBody(event.currentTarget.value);
    // }
    //
    // const commentClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     let date = new Date().toJSON()
    //     if (textBody.length>5) {
    //         let threadComment = {
    //             "replier": current_user_id,
    //             "commentBody": textBody,
    //             "threadDate": thread?.threadDate,
    //             "threadDateTxt": thread?.threadDateTxt,
    //             "commentDate": date,
    //             "commentDateTxt": date,
    //             "comment_upvote": 0,
    //             "comment_downvote": 0
    //         }
    //         ThreadCommentService.postThreadComment(threadComment).then();
    //         if (imgArray.length>0) {
    //             for (const key in imgArray) {
    //                 let threadPicture = {
    //                     "replier": current_user_id,
    //                     "threadDate": thread?.threadDate,
    //                     "threadDateTxt": thread?.threadDateTxt,
    //                     "commentDate": date,
    //                     "commentDateTxt": date,
    //                     "threadCommentSinglePicture": imgArray[key]
    //                 }
    //                 ThreadCommentPicturesService.postThreadCommentPicture(threadPicture).then();
    //             }
    //         }
    //         setimgArray([]);
    //         settextBody("");
    //
    //     }
    // }

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
                                <span className="m-2">{globalBlogId}</span>
                            </a>
                            <span className="post-date m-3">{blog?.blogDateTxt}</span>
                        </div>
                        <h3 className="mt-3">{blog?.blogTitle}</h3>
                        <p>{blog?.blogBody}</p>
                        <div className="thread-images">
                            {pictures.length>0?
                                pictures.map(picture => (
                                    <img className="ms-2 mt-2" src={picture.blogSinglePicture} alt="Blog Picture" height="200"/>
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
                                {blogTopics.slice(0,3).map(topc => <TopicBadge topic={topc}/>)}
                            </span>
                        </div>
                    </div>
                </div>



                {/*{isAuthorised=='true'&&*/}
                {/*    <div className="card mt-3 shadow bg-black-50">*/}
                {/*        <div className="mb-1 ms-1 me-1 mt-1">*/}
                {/*            <textarea className="form-control shadow" id="textBody" maxLength={60000} rows={7} placeholder="Write something..." onInput={BodyChanged}></textarea>*/}
                {/*        </div>*/}


                {/*        <div className="d-flex">*/}

                {/*            {imgArray.length>0 &&*/}
                {/*                imgArray.map(ig => (*/}
                {/*                    <div>*/}
                {/*                        <img className='m-1' src={ig} alt="Thread Image" height={60} width={60}/>*/}
                {/*                    </div>*/}
                {/*                ))*/}
                {/*            }*/}


                {/*            {imgArray.length<=2&&*/}
                {/*                <div>*/}
                {/*                    <label className="form-label text-white m-1" htmlFor="customFile1">*/}
                {/*                        <div className="add-image"></div>*/}
                {/*                    </label>*/}
                {/*                    <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control d-none"*/}
                {/*                           id="customFile1"  onChange={(event) => {*/}

                {/*                        if (event.target.files){*/}
                {/*                            getBase64(event.target.files[0])*/}
                {/*                        }*/}
                {/*                    }}/>*/}
                {/*                </div>*/}
                {/*            }*/}
                {/*            <button type="button" className="btn btn-sm btn-outline-success ms-auto mb-3 mt-2 me-1 ps-3 pe-3 pt-0 pb-0" onClick={commentClicked}>*/}
                {/*                Comment*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*</div>*/}
                {/*}*/}



















                {blogId != undefined &&
                    <BlogComment blogId={blogId}/>
                }
            </div>
        </div>
    );
};