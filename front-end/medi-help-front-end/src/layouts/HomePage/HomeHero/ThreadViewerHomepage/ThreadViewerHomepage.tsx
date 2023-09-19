import { SingleThreadCard } from "./SingleThreadCard";
import { HomePageThreadPagination } from "./HomePageThreadPagination";
import {useEffect, useState} from "react";
import ThreadViewerModel from "../../../../models/ThreadViewerModel/ThreadViewerModel";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";


export const ThreadViewerHomepage = () => {

  const [threads, setThreads] = useState<ThreadViewerModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchThreads = async () => {
      const baseUrl: string = "http://localhost:8080/api/threads";

      const url: string = `${baseUrl}?page=0&size=10`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.threads;

      const loadedThreads: ThreadViewerModel[] = [];

      for (const key in responseData) {

        let user_id: string = responseData[key].uploaderId;
        const resp = await fetch(`http://localhost:8080/api/users/${user_id}`);
        const respData = await resp.json();

        loadedThreads.push({
          uploaderId: responseData[key].uploaderId,
          threadTitle: responseData[key].threadTitle,
          threadBody: responseData[key].threadBody,
          threadDate: responseData[key].threadDate,
          threadTrendView: responseData[key].threadTrendView,
          userName: respData.userName,
          userType: respData.userType,
          userPicture: respData.picture
        });
      }

      setThreads(loadedThreads);
      setIsLoading(false);
    };
    fetchThreads().catch((error: any) => {
      setHttpError(error.message);
    })
  }, []);

  if (isLoading) {
    return (
        <SpinnerLoading/>
    )
  }

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

        <HomePageThreadPagination />
      </div>
  );
};
