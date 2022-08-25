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
import {
  removeDuplicates,
  removeDuplicatesObjectId,
} from "../../script/helper";
import { useRefetch } from "../../hooks/refetchContext";
import SendPost from "../../component/Popup/SendPost/sendpost";
import Advertisement from "../../component/Advertisement/advertisement";
import Right from "./right/right";
import Left from "./left/left";
import StartPostButton from "./startpost/startPostButton";

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
  const { refetchUser } = useRefetch();

  const { data, loading, refetch } = useQuery(INFINITY_QUERY, {
    variables: {
      limit: limit,
      offset: offset,
    },
  });

  useEffect(() => {
    refetchUser();
  }, []);

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
      setPost((prev: any) => {
        const newArr = [...prev, ...data.postInfinity];
        const filteredArr = removeDuplicatesObjectId(newArr);
        return filteredArr;
      });
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
      <div className="home h-min-max">
        {/* Left */}
        <Left></Left>

        {/* Home */}
        <div className="home-center">
          <StartPostButton handle={handlePopup}></StartPostButton>
          <div className="center">
            <div className="mt-3 border"></div>
          </div>
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
                        idx={idx}
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
                      idx={idx}
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
        {/* Advertisement */}
        <Right></Right>
      </div>
    </>
  );
}
