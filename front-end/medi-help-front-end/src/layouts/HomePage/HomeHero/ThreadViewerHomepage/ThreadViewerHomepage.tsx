import { SingleThreadCard } from "./SingleThreadCard";
import { HomePageThreadPagination } from "./HomePageThreadPagination";
import {useEffect, useState} from "react";
import ThreadViewerModel from "../../../../models/ThreadViewerModel/ThreadViewerModel";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import {Pagination} from "../../../utils/Pagination";


export const ThreadViewerHomepage = () => {

  const [threads, setThreads] = useState<ThreadViewerModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ThreadsPerPage] = useState(15);
  const [totalAmountOfThreads, setTotalAmountOfThreads] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchThreads = async () => {
      const baseUrl: string = "http://localhost:8080/api/threads";

      const url: string = `${baseUrl}?page=${currentPage-1}&size=${ThreadsPerPage}`;

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
        const resp = await fetch(`http://localhost:8080/api/users/${user_id}`);
        const respData = await resp.json();

        let current_date: string = responseData[key].threadDateTxt;
        const topicResp = await fetch(`http://localhost:8080/api/threadTopics/search/findByUploaderIdAndThreadDateTopicTxt?uploaderId=${user_id}&threadDateTopicTxt=${current_date}`);
        const topicRespJson = await topicResp.json();
        const topicRespData =  topicRespJson._embedded.threadTopics;
        let topic_array: string[] = [];
        for (const topic in topicRespData){
          topic_array.push(topicRespData[topic].topicTitle);
          console.log(topicRespData[topic].topicTitle);
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
  }, [currentPage]);

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

  return (
      <div className={"home-thread-bg shadow"}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <div className="p-2">
              <select
                  className="form-select form-select-md"
                  aria-label="Default select example"
              >
                <option selected>Trending</option>
                <option value="1">Newest First</option>
                <option value="2">Oldest First</option>
                <option value="3">Most Voted</option>
                <option value="3">Most Viewed</option>
              </select>
            </div>
            <div className="pt-2">
              <h4 className="fw-bold">Threads</h4>
            </div>
            <div className="p-2">
              <a type="button" className="btn btn-md btn-outline-dark" href="#">
                Create Thread
              </a>
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
