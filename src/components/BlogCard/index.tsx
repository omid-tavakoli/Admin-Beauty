interface blogInfo {
  src: string;
  profile: string;
  type: string;
  title: string;
  author: string;
  date: string;
  view: string;
}

const BlogCard = ({ data }: { data: blogInfo[] }) => {
  return (
    <div className=" center bg-white border border-gray-100 rounded-lg w-[22.5rem] h-[7.75rem] text-black font-medium">
      {data.map((blog, i) => (
        <>
          <div key={i} className="center w-[6.25rem] h-[6.25rem]">
            <img src={blog.src} className="rounded-lg" alt="hair" />
          </div>
          <div className="rounded-md bg-gray-100 w-[1px] h-[6.25rem] mx-3"></div>
          <div>
            <div className="center text-xs w-[48px] h-[17px] rounded-full text-pink-100 bg-pink-50 mb-2.5">
              {blog.type}
            </div>
            <div className=" text-xs mb-5">{blog.title}</div>
            <div className="flex gap-x-2 items-center">
              <div className="flex items-center gap-x-2">
                <div className="w-5 h-5">
                  <img
                    src={blog.profile}
                    alt="Profile"
                    className="rounded-full border border-pink-100 "
                  />
                </div>
                <h5 className="text-xs">{blog.author}</h5>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="w-1 h-1 bg-pink-100 rounded-full"></div>
                <h5 className="text-xs mr-1">{blog.date}</h5>
                <svg width="16" height="20">
                  <use href={"/images/icons/calender.svg#calender"}></use>
                </svg>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="w-1 h-1 bg-pink-100 rounded-full"></div>
                <h5 className="text-xs mr-1">{blog.view}</h5>
                <span>
                  <svg width="16" height="20">
                    <use href={"/images/icons/view.svg#view"}></use>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default BlogCard;
