import { SingleBlogCard } from "./SingleBlogCard";
import { HomePageBlogPagination } from "./HomePageBlogPagination";

export const BlogViewerHomepage = () => {
  return (
    <div className={"home-blog-bg shadow"}>
      <div className="container-fluid">
        <div className="d-flex  justify-content-between">
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
            <h4 className="fw-bold">Blogs</h4>
          </div>
          <div className="p-2">
            <a type="button" className="btn btn-md btn-outline-dark" href="#">
              Create Blog
            </a>
          </div>
        </div>
      </div>

      <div className="container d-flex align-items-center ">
        <div className="row">
          <SingleBlogCard />
          <SingleBlogCard />
          <SingleBlogCard />
          <SingleBlogCard />
          <SingleBlogCard />
          <SingleBlogCard />
        </div>
      </div>

      <HomePageBlogPagination />
    </div>
  );
};
