import {Link, useLocation} from "react-router-dom";
import ThreadViewerModel from "../../models/ThreadViewerModel/ThreadViewerModel";
export const ThreadView = () => {

    const location: any = useLocation();
    const thread: ThreadViewerModel = location.state.props.thread;

    const userId = thread.uploaderId;

    return (
        <div>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <div className="user-info">
                            <Link to={{pathname: "/profile", state: {userId}}}>
                                {thread.userPicture?
                                    <img src={thread.userPicture} alt="Profile Picture" className="rounded-circle" width="50" />
                                    :
                                    <img src={require('./../../images/Placeholder-images/placeholder-dp.png')} alt="Profile Picture" className="rounded-circle" width="50" />
                                }
                                <span className="m-2">John Doe</span>
                            </Link>
                        </div>
                        <h1 className="mt-3">Sample Thread Title</h1>
                        <p>This is the body of the sample thread. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div className="thread-images">
                            <img src={require('./../../images/ThreadView-image/Body1.jpeg')} alt="Image 1" className="img-fluid" />
                            <img src={require('./../../images/ThreadView-image/body2.jpeg')} alt="Image 2" className="img-fluid" />
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