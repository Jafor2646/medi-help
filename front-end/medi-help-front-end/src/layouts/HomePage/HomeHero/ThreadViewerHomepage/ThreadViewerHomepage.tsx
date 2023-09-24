import { SingleThreadCard } from "./SingleThreadCard";
import React, {useContext, useEffect, useState} from "react";
import ThreadViewerModel from "../../../../models/ThreadViewerModel/ThreadViewerModel";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import {Pagination} from "../../../utils/Pagination";
import {UserContext} from "../../../../Auth/UserContext";
import {Link} from "react-router-dom";
import TopicTable from "../../../../models/TopicTable";
import {TopicBadge} from "../../../utils/TopicBadge";
import UserService from "../../../../Service/UserService";
import ThreadServices from "../../../../Service/ThreadServices";
import ThreadPictureService from "../../../../Service/ThreadPictureService";
import ThreadTopicService from "../../../../Service/ThreadTopicService";

export const ThreadViewerHomepage = () => {

  const {isAuthorised, current_user_id} = useContext(UserContext);

  const [threads, setThreads] = useState<ThreadViewerModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ThreadsPerPage] = useState(15);
  const [totalAmountOfThreads, setTotalAmountOfThreads] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categorySelection, setCategorySelection] = useState('Trending');
  const [searchUrl, setSearchUrl] = useState(`&sort=threadTrendView,desc`);
  const [postOpen, setpostOpen] = useState('false')

  const [textTitle, settextTitle] = useState("");
  const [textBody, settextBody] = useState("");
  const [imgArray, setimgArray] = useState<string[]>([]);
  const [topicTable, settopicTable] = useState<TopicTable[]>([]);
  const [selectedTopic, setselectedTopic] = useState<string[]>([]);




  useEffect(() => {
    const fetchTopic = async () => {
      const baseUrl: string = "http://localhost:8080/api";

      const url: string = `${baseUrl}/topicTables`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.topicTables;

      const loadedTopics: TopicTable[] = [];

      for (const key in responseData) {

        loadedTopics.push({
          topicName: responseData[key].topicName
        });
      }
      settopicTable(loadedTopics);

    };
    fetchTopic().catch((error: any) => {
      setHttpError(error.message);
    })
  }, []);


  useEffect(() => {
    const fetchThreads = async () => {
      const baseUrl: string = "http://localhost:8080/api";

      const url: string = `${baseUrl}/threads?page=${currentPage-1}&size=${ThreadsPerPage}${searchUrl}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson.content;

      setTotalAmountOfThreads(responseJson.totalElements);
      setTotalPages(responseJson.totalPages);

      const loadedThreads: ThreadViewerModel[] = [];

      for (const key in responseData) {

        let user_id: string = responseData[key].uploaderId;
        const resp = await fetch(`${baseUrl}/users/search/findUserByUserId?userId=${user_id}`);
        const respJson = await resp.json();
        const respData = respJson._embedded.users[0];

        let current_date: string = responseData[key].threadDateTxt;
        const topicResp = await fetch(`${baseUrl}/threadTopics/search/findByUploaderIdAndThreadDateTopicTxt?uploaderId=${user_id}&threadDateTopicTxt=${current_date}`);
        const topicRespJson = await topicResp.json();
        const topicRespData =  topicRespJson._embedded.threadTopics;
        let topic_array: string[] = [];
        for (const topic in topicRespData){
          topic_array.push(topicRespData[topic].topicTitle);
        }

        loadedThreads.push({
          uploaderId: responseData[key].uploaderId,
          threadTitle: responseData[key].threadTitle,
          threadBody: responseData[key].threadBody,
          threadDate: responseData[key].threadDate,
          threadDateTxt: responseData[key].threadDateTxt,
          threadTrendView: responseData[key].threadTrendView,
          userName: responseData[key].uploaderId,
          userType: respData.userType,
          userPicture: respData.picture,
          threadTopics: topic_array
        });
      }

      setThreads(loadedThreads);
      setIsLoading(false);
    };
    fetchThreads().catch((error: any) => {
      setHttpError(error.message);
    })
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

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

  const indexOfLastBook: number = currentPage * ThreadsPerPage;
  const indexOfFirstBook: number = indexOfLastBook - ThreadsPerPage;
  let lastItem = ThreadsPerPage * currentPage <= totalAmountOfThreads ?
      ThreadsPerPage * currentPage : totalAmountOfThreads;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);



  const categoryField = (value: string) => {
    if (value === 'Newest First') {
      setCategorySelection(value);
      setSearchUrl(`&sort=threadDate`);
    }
    else if (value === 'Oldest First') {
      setCategorySelection(value);
      setSearchUrl(`&sort=threadDate,desc`);
    }
    else if (value === 'Most Voted') {
      setCategorySelection(value);
      setSearchUrl(`&sort=threadUpvote,desc`);
    }
    else if (value === 'Most Viewed') {
      setCategorySelection(value);
      setSearchUrl(`&sort=threadView,desc`);
    }
    else {
      setCategorySelection('Trending');
      setSearchUrl(`&sort=threadTrendView,desc`);
    }
  }

  const CreateThreadClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setpostOpen('true');
  }
  const DiscardClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setpostOpen('false');
  }

  const TitleChanged = (event: React.MouseEvent<HTMLInputElement>) => {
    settextTitle(event.currentTarget.value);
  }

  const BodyChanged = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    settextBody(event.currentTarget.value);
  }

  const topicSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value != "default"){
      if (!(event.target.value in selectedTopic) && selectedTopic.length<3){
        let tempArray: string[] = [];
        for (const val in selectedTopic){
          tempArray.push(selectedTopic[val]);
        }
        tempArray.push(event.target.value);
        setselectedTopic(tempArray);
      }
    }
  }

  const postClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let date = new Date().toJSON()
    if (textTitle.length>4 && textBody.length>5 && topicSelected.length>0) {
      let thread = {
        "uploaderId": current_user_id,
        "threadTitle": textTitle,
        "threadBody": textBody,
        "threadDate": date,
        "threadDateTxt": date,
        "threadView": 0,
        "threadTrendView": 0,
        "threadUpvote": 0,
        "threadDownvote": 0
      }
      ThreadServices.createThread(thread).then();
      for(const key in imgArray){
        let threadPicture = {
          "uploaderId": current_user_id,
          "threadDate": date,
          "threadDateTxt": date,
          "threadSinglePicture": imgArray[key]
        }
        ThreadPictureService.createThreadPicture(threadPicture).then();
      }
      for(const key in selectedTopic){
        let topicList = {
          "uploaderId" : current_user_id,
          "threadDateTopic" : date,
          "threadDateTopicTxt": date,
          "topicTitle": selectedTopic[key]
        }
        ThreadTopicService.createThreadTopic(topicList).then();
      }
      // setimgArray([]);
      // settextTitle("");
      // settextBody("");
      // setselectedTopic([]);
      // setpostOpen('false');

    }
  }





  return (
      <div className={"home-thread-bg shadow"}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
              <div className='dropdown p-2'>
                <button className='btn bg-white dropdown-toggle' type='button'
                        id='dropdownMenuButton1' data-bs-toggle='dropdown'
                        aria-expanded='false'>
                  {categorySelection}
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                  <li onClick={() => categoryField('Trending')}>
                    <a className='dropdown-item' href='#'>
                      Trending
                    </a>
                  </li>
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
                  <li onClick={() => categoryField('Most Viewed')}>
                    <a className='dropdown-item' href='#'>
                      Most Viewed
                    </a>
                  </li>
                </ul>
              </div>
            <div className="pt-2">
              <h4 className="fw-bold">Threads</h4>
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
                        <button type="button" className="btn btn-md btn-outline-success" onClick={postClicked}>
                          Post
                        </button>
                      </div>
                      :
                      <button type="button" className="btn btn-md btn-outline-dark" onClick={CreateThreadClicked}>
                        Create Thread
                      </button>
              }

            </div>
          </div>
        </div>

        {postOpen === 'true'&&
            <div className="card m-2 shadow">
              <div className="mb-3 ms-1 mt-1 me-1">
                <input className="form-control shadow fw-bold" id="textTitle" maxLength={250} placeholder="Title" onInput={TitleChanged}/>
              </div>
              <div className="mb-1 ms-1 me-1">
                <textarea className="form-control shadow" id="textBody" maxLength={60000} rows={7} placeholder="Your Question" onInput={BodyChanged}></textarea>
              </div>

              <div className="d-flex">

                {imgArray.length>0 &&
                    imgArray.map(ig => (
                        <div>
                          {/*<button data-bs-toggle="modal" data-bs-target="#imageModal">*/}
                            <img className='m-1' src={ig} alt="Thread Image" height={60} width={60}/>
                          {/*</button>*/}
                          {/*<div className="modal fade" id="imageModal" aria-labelledby="exampleModalLabel" aria-hidden="true">*/}
                          {/*  <div className="modal-dialog modal-xl  modal-dialog-scrollable modal-dialog-centered">*/}
                          {/*    <div className="modal-content">*/}
                          {/*      <div className="modal-body">*/}
                          {/*        <img src={ig} alt="Thread Image"  height={400}/>*/}
                          {/*      </div>*/}
                          {/*      <div className="modal-footer">*/}
                          {/*        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
                          {/*        <button type="button" className="btn btn-danger">Remove</button>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </div>*/}
                          {/*</div>*/}
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
                           let tempImg: string[] = [];
                           for(let i in imgArray) {
                             tempImg.push(imgArray[i]);
                           }
                           if (event.target.files != null){
                             tempImg.push(URL.createObjectURL(event.target.files[0]));
                           }
                           setimgArray(tempImg);
                  }}/>
                </div>}

              </div>

              <div className="d-flex card-body p-0">
                {selectedTopic.length<3&&
                <div className='mb-1 ms-1'>
                      <select className="form-select shadow" id="typeSelect" onChange={topicSelected}>
                        <option selected value='default'> Select at least one Topic</option>
                        {topicTable.map(topic => (
                            <option value={topic.topicName}>{topic.topicName}</option>
                        ))}
                      </select>
                </div>
                }
                {selectedTopic.length>0&&
                    selectedTopic.map(topic => (
                        <span className="m-1">
                            <TopicBadge topic={topic}/>
                        </span>
                    ))
                }
              </div>
            </div>
        }


        <div>
          {threads.map(thread => (
              <SingleThreadCard thread={thread}/>
          ))}
        </div>
        {totalPages>1 &&
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        }
      </div>
  );
};
