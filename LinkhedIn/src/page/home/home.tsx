import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import LogoutButton from "../../component/LogoutButton/logout";
import Navbar from "../../component/Navbar/navbar";
import CreatePost from "../../component/Popup/CreatePost/createPost";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userContext";
import { INFINITY_QUERY, SEARCH_POST_QUERY } from "../../query/post";
import "./css-home.scss";
import PostCard from "./post-card/post-card";
import ReactLoading from "react-loading";

export default function Home() {
  const { user } = useUserAuth();
  const [handleCreate, setHandleCreate] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 3;
  const heightOffset = 1;
  const [fakeLoading, setFakeLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPost] = useState<any>([]);
  const loadingTime = 2000;

  const { data, loading, refetch } = useQuery(INFINITY_QUERY, {
    variables: {
      limit: limit,
      offset: offset,
    },
  });

  // Infinity Scroll
  const observer = useRef<any>();
  const lastRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (hasMore && entries[0].isIntersecting) {
          setFakeLoading(true);
          setTimeout(() => {
            setFakeLoading(false);
            loadMore();
          }, loadingTime);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (data) {
      if (data.postInfinity.length < limit) {
        setHasMore(false);
      }
      setPost((prev: any) => [...prev, ...data.postInfinity]);
    }
  }, [data]);

  function loadMore() {
    if (hasMore)
      refetch({ limit: limit, offset: offset }).then((resp) => {
        setOffset((prev) => prev + limit);
      });
  }

  function handlePopup() {
    setHandleCreate((prev) => !prev);
  }

  return (
    <>
      <div className="home">
        <div className="home-center">
          <button className="start-btn" onClick={handlePopup}>
            Start a Post
          </button>
          {handleCreate ? (
            <CreatePost setHandle={setHandleCreate}></CreatePost>
          ) : (
            ""
          )}
          {data
            ? posts.map((data: any, idx: any) => {
                if (idx === posts.length - 1) {
                  return (
                    <div ref={lastRef} key={idx}>
                      <PostCard
                        refetch={refetch}
                        data={data}
                        key={idx}
                        text={data.text}
                        link={data.AttachmentLink}
                      ></PostCard>
                    </div>
                  );
                } else {
                  return (
                    <PostCard
                      ref={lastRef}
                      refetch={refetch}
                      data={data}
                      key={idx}
                      text={data.text}
                      link={data.AttachmentLink}
                    ></PostCard>
                  );
                }
              })
            : ""}
          <div className="center">
            {fakeLoading ? (
              <ReactLoading
                type="balls"
                className="mt-3"
                color="gray"
                height={"10%"}
                width={"10%"}
              ></ReactLoading>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
