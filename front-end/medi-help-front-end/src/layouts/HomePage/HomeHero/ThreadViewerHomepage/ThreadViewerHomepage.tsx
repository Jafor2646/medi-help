import { SingleThreadCard } from "./SingleThreadCard";
import React, {useContext, useEffect, useState} from "react";
import ThreadViewerModel from "../../../../models/ThreadViewerModel/ThreadViewerModel";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import {Pagination} from "../../../utils/Pagination";
import {UserContext} from "../../../../Auth/UserContext";
import {Link} from "react-router-dom";


export const ThreadViewerHomepage = () => {

  const {isAuthorised} = useContext(UserContext);

  const [threads, setThreads] = useState<ThreadViewerModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ThreadsPerPage] = useState(15);
  const [totalAmountOfThreads, setTotalAmountOfThreads] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categorySelection, setCategorySelection] = useState('Trending');
  const [searchUrl, setSearchUrl] = useState(`&sort=threadTrendView,desc`);

  useEffect(() => {
    const fetchThreads = async () => {
      const baseUrl: string = "http://localhost:8080/api";

      const url: string = `${baseUrl}/threads?page=${currentPage-1}&size=${ThreadsPerPage}${searchUrl}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.threads;

      setTotalAmountOfThreads(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

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
    // window.scrollTo(0, 0);
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
              {isAuthorised=='true'?
                  <button type="button" className="btn btn-md btn-outline-dark">
                    Create Thread
                  </button>
                  :
                  <Link type="button" className="btn btn-md btn-outline-dark" to='/login'>
                    Sign in
                  </Link>
              }

            </div>
          </div>
        </div>

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
