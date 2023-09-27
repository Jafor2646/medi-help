import { SingleThreadComment } from "./SingleThreadComment";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Auth/UserContext";
import {Link} from "react-router-dom";
import ThreadCommentModel from "../../models/ThreadCommentModel";
import ThreadCommentService from "../../Service/ThreadCommentService";
import ThreadCommentPicturesService from "../../Service/ThreadCommentPicturesService";
import ThreadModel from "../../models/ThreadModel";
import {Pagination} from "../utils/Pagination";
import {SpinnerLoading} from "../utils/SpinnerLoading";

export const ThreadComment: React.FC<{threadId: number}> = (props) => {

  const {isAuthorised, current_user_id} = useContext(UserContext);

  const [comments, setcomments] = useState<ThreadCommentModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [CommentsPerPage] = useState(15);
  const [totalAmountOfComments, setTotalAmountOfComments] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categorySelection, setCategorySelection] = useState('Most Voted');
  const [searchUrl, setSearchUrl] = useState(`&sort=commentUpvote,desc`);
  const [postOpen, setpostOpen] = useState('false')

  const [textBody, settextBody] = useState("");
  const [imgArray, setimgArray] = useState<any[]>([]);




  useEffect(() => {
    const fetchThreads = async () => {
      const baseUrl: string = "http://localhost:8080/api";


      const url: string = `${baseUrl}/threadComments/search/findAllByThreadId?threadId=${props.threadId}&page=${currentPage-1}&size=${CommentsPerPage}${searchUrl}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.threadComments;

      setTotalAmountOfComments(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPage);

      const loadedComments: ThreadCommentModel[] = [];

      for (const key in responseData) {

        loadedComments.push({
          commentId: responseData[key].commentId,
          replier: responseData[key].replier,
          threadId: responseData[key].threadId,
          commentBody: responseData[key].commentBody,
          commentDate: responseData[key].commentDate,
          commentDateTxt: responseData[key].commentDateTxt,
          commentUpvote: responseData[key].commentUpvote,
          commentDownvote: responseData[key].commentDownvote
        });
      }

      setcomments(loadedComments);
      setIsLoading(false);
    };
    fetchThreads().catch((error: any) => {
      setHttpError(error.message);
    })
    // window.scrollTo(0, 0);
  }, [currentPage, searchUrl, comments]);

  if (isLoading) {
    return (
        <SpinnerLoading/>
    )
  }

  if (httpError) {
    return (
        <div className='container m-5'>
          <p>{httpError}</p>
        </div>
    )
  }

  const indexOfLastBook: number = currentPage * CommentsPerPage;
  const indexOfFirstBook: number = indexOfLastBook - CommentsPerPage;
  let lastItem = CommentsPerPage * currentPage <= totalAmountOfComments ?
      CommentsPerPage * currentPage : totalAmountOfComments;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const categoryField = (value: string) => {
    if (value === 'Newest First') {
      setCategorySelection(value);
      setSearchUrl(`&sort=commentDate,desc`);
    }
    else if (value === 'Oldest First') {
      setCategorySelection(value);
      setSearchUrl(`&sort=commentDate`);
    }
    else {
      setCategorySelection('Most Voted');
      setSearchUrl(`&sort=commentUpvote,desc`);
    }
  }

  const CreateCommentClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setpostOpen('true');
  }
  const DiscardClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setpostOpen('false');
    setimgArray([]);
    settextBody("");
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
    if (textBody.length>1) {
      let threadComment = {
        "replier": current_user_id,
        "commentBody": textBody,
        "threadId": props.threadId,
        "commentDate": date,
        "commentDateTxt": date,
        "comment_upvote": 0,
        "comment_downvote": 0
      }
      ThreadCommentService.postThreadComment(threadComment).then(
          resp=>{
          if (imgArray.length>0) {
            for (const key in imgArray) {
              let threadPicture = {
                "replier": current_user_id,
                "commentId": resp.data.threadId,
                "threadCommentSinglePicture": imgArray[key]
              }
              ThreadCommentPicturesService.postThreadCommentPicture(threadPicture).then();
            }
          }
      }
      );
      setimgArray([]);
      settextBody("");
      setpostOpen('false');

    }
  }





  return (
      <div className={"home-thread-bg shadow mt-2"}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
              <div className='dropdown p-2'>
                <button className='btn bg-white dropdown-toggle' type='button'
                        id='dropdownMenuButton1' data-bs-toggle='dropdown'
                        aria-expanded='false'>
                  {categorySelection}
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                  <li onClick={() => categoryField('Newest First')}>
                    <a className='dropdown-item' href='#'>
                      Newest First
                    </a>
                  </li>
                  <li onClick={() => categoryField('Oldest First')}>
                    <a className='dropdown-item' href='#'>
                      Oldest First
                    </a>
                  </li>
                  <li onClick={() => categoryField('Most Voted')}>
                    <a className='dropdown-item' href='#'>
                      Most Voted
                    </a>
                  </li>
                </ul>
              </div>
            <div className="pt-2">
              <h4 className="fw-bold">Comments</h4>
            </div>
            <div className="p-2">
              {isAuthorised=='false'?
                  <Link type="button" className="btn btn-md btn-outline-dark" to='/login'>
                    Sign in
                  </Link>
                  :
                  postOpen === 'true'?
                      <div>
                        <button type="button" className="btn btn-md btn-outline-danger me-3" onClick={DiscardClicked}>
                          Discard
                        </button>
                        <button type="button" className="btn btn-md btn-outline-success" onClick={commentClicked}>
                          Post
                        </button>
                      </div>
                      :
                      <button type="button" className="btn btn-md btn-outline-dark" onClick={CreateCommentClicked}>
                        Comment
                      </button>
              }

            </div>
          </div>
        </div>

        {postOpen === 'true'&&
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


        <div>
          {comments.map(comment => (
              <SingleThreadComment comments={comment}/>
          ))}
        </div>
        {totalPages>1 &&
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        }
      </div>
  );
};
