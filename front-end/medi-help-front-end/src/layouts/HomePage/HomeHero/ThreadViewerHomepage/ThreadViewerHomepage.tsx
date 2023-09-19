import { SingleThreadCard } from "./SingleThreadCard";
import { HomePageThreadPagination } from "./HomePageThreadPagination";
import {useEffect, useState} from "react";
import ThreadModel from "../../../../models/ThreadModel";


export const ThreadViewerHomepage = () => {

  const [threads, setThreads] = useState<ThreadModel[]>([]);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchThreads = async () => {
      const baseUrl: string = "http://localhost:8080/api/threads";

      const url: string = `${baseUrl}?page=0&size=6`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.threads;

      const loadedThreads: ThreadModel[] = [];

      for (const key in responseData) {
        loadedThreads.push({
          threadId: responseData[key].threadId,
          uploaderId: responseData[key].uploaderId,
          threadTitle: responseData[key].threadTitle,
          threadBody: responseData[key].threadBody,
          threadDate: responseData[key].threadDate,
          threadView: responseData[key].threadView,
          threadTrendView: responseData[key].threadTrendView,
          threadUpvote: responseData[key].threadUpvote,
          threadDownvote: responseData[key].threadDownvote
        });
      }

      setThreads(loadedThreads);
    };
    fetchThreads().catch((error: any) => {
      setHttpError(error.message);
    })
  }, []);

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
              <SingleThreadCard thread={thread} />
          ))}
        </div>

        <HomePageThreadPagination />
      </div>
  );
};
