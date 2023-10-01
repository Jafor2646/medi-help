import { SingleThreadCardUserProfile } from "../UserProfile/SingleThreadCardUserProfile";
import React, { useContext, useEffect, useState } from "react";
import ThreadViewerModel from "../../../models/ThreadViewerModel/ThreadViewerModel";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { Pagination } from "../../utils/Pagination";
import { UserContext } from "../../../Auth/UserContext";
import { Link } from "react-router-dom";
import TopicTable from "../../../models/TopicTable";
import { TopicBadge } from "../../utils/TopicBadge";
import ThreadServices from "../../../Service/ThreadServices";
import ThreadPictureService from "../../../Service/ThreadPictureService";
import ThreadTopicService from "../../../Service/ThreadTopicService";
import HospitalEquipmentListModel from "../../../models/HospitalEquipmentListModel";
import {SingleTestCard} from "./SingleTestCard";
import HospitalEquipmentListService from "../../../Service/HospitalEquipmentListService";

export const TestViewer: React.FC<{ userId: string }> = (props) => {
  const { isAuthorised, current_user_id } = useContext(UserContext);

  const [tests, settests] = useState<HospitalEquipmentListModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ThreadsPerPage] = useState(15);
  const [totalAmountOfThreads, setTotalAmountOfThreads] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchUrl, setSearchUrl] = useState(`&sort=threadTrendView,desc`);
  const [postOpen, setpostOpen] = useState("false");

  const [textTitle, settextTitle] = useState("");
  const [textPrice, settextPrice] = useState(0);

  useEffect(() => {
    const fetchTopic = async () => {
      const baseUrl: string = "http://localhost:8080/api";

      const url: string = `${baseUrl}/hospitalEquipmentLists/search/findAllByHospitalUserId?hospitalId=${props.userId}&page=${currentPage-1}&size=${ThreadsPerPage}${searchUrl}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.hospitalEquipmentLists;


      const loadedEqupment: HospitalEquipmentListModel[] = [];

      for (const key in responseData) {
        let myurl = responseData[key]._links.self.href;
        let arr = myurl.split('/');
        let id: number = Number(arr[arr.length-1]);
        let tempEquipment = new HospitalEquipmentListModel(id,responseData[key].hospitalUserId,responseData[key].equipmentName, responseData[key].quantity);
        loadedEqupment.push(tempEquipment);
      }
      settests(loadedEqupment);
      setIsLoading(false);
    };
    fetchTopic().catch((error: any) => {
      setHttpError(error.message);
    });
  }, [tests]);



  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const indexOfLastBook: number = currentPage * ThreadsPerPage;
  const indexOfFirstBook: number = indexOfLastBook - ThreadsPerPage;
  let lastItem =
    ThreadsPerPage * currentPage <= totalAmountOfThreads
      ? ThreadsPerPage * currentPage
      : totalAmountOfThreads;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);



  const CreateTestClicked = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setpostOpen("true");
  };
  const DiscardClicked = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setpostOpen("false");
    settextTitle("");
    settextPrice(0);
  };

  const TitleChanged = (event: React.MouseEvent<HTMLInputElement>) => {
    settextTitle(event.currentTarget.value);
  };
  const PriceChanged = (event: React.MouseEvent<HTMLInputElement>) => {
    settextPrice(Number(event.currentTarget.value));
  };



  const postClicked = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (textTitle.length>0 && textPrice>0){
      let test = {
        "hospitalUserId": current_user_id,
        "equipmentName": textTitle,
        "quantity": textPrice
      }
      HospitalEquipmentListService.createTest(test).then();
      setpostOpen("false");
      settextTitle("");
      settextPrice(0);
    }
  };


  return (
    <div className={"home-thread-bg shadow"}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between">

          <div className="pt-2">
            <h4 className="fw-bold">Tests</h4>
          </div>
          <div className="p-2">
            {isAuthorised == "false" ? (
              <Link
                type="button"
                className="btn btn-md btn-outline-dark"
                to="/login"
              >
                Sign in
              </Link>
            ) : props.userId === current_user_id ? (
              postOpen === "true" ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-md btn-outline-danger me-3"
                    onClick={DiscardClicked}
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    className="btn btn-md btn-outline-success"
                    onClick={postClicked}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-md btn-outline-dark"
                  onClick={CreateTestClicked}
                >
                  Add New Test
                </button>
              )
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>

      {postOpen === "true" && (
        <div className="card m-2 shadow">
          <div className="mb-1 ms-1 mt-1 me-1">
            <input
              className="form-control shadow fw-bold"
              id="textTitle"
              maxLength={250}
              placeholder="Test Name"
              onInput={TitleChanged}
            />
            <input
              className="form-control shadow fw-bold mt-1"
              id="priceTitle"
              maxLength={20}
              type={"number"}
              placeholder="Cost"
              onInput={PriceChanged}
            />
          </div>
        </div>
      )}

      <div>
        {tests.map((test) => (
          <SingleTestCard hospitalEquipment={test} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
