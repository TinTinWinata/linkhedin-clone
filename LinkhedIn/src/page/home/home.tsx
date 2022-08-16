import { useQuery } from "@apollo/client";
import { useState } from "react";
import LogoutButton from "../../component/LogoutButton/logout";
import Navbar from "../../component/Navbar/navbar";
import CreatePost from "../../component/Popup/CreatePost/createPost";
import { useUserAuth } from "../../hooks/userContext";
import { SEARCH_POST_QUERY } from "../../query/post";
import "./css-home.scss";

export default function Home() {
  const { user } = useUserAuth();
  const [handleCreate, setHandleCreate] = useState(false);

  function handlePopup() {
    setHandleCreate((prev) => !prev);
  }

  const { data } = useQuery(SEARCH_POST_QUERY);

  return (
    <>
      <div className="home">
        <div className="home-center">
          <button className="start-btn" onClick={handlePopup}>Start a Post</button>
          {handleCreate ? (
            <CreatePost setHandle={setHandleCreate}></CreatePost>
          ) : (
            ""
          )}
          {data
            ? data.posts.map((post: any, idx: any) => {
                return (
                  <div
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: post.text }}
                  ></div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}
