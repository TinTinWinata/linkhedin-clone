import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useUserAuth } from "../../../../hooks/userContext";
import { FIND_USER_QUERY } from "../../../../query/user";
import { RichTextPost } from "../../../../script/helper";
import NavigateText from "./navigateText";
import "./postRichText.scss";
import ReactLoading from "react-loading";

export default function PostRichText({
  children,
  index,
}: {
  children: any;
  index: any;
}) {
  const text = children;
  const a = RichTextPost(text, index);
  const { user } = useUserAuth();

  const [queriedUser, setUser] = useState({
    name: "",
    email: "",
    PhotoProfile: "",
  });
  const { refetch, loading } = useQuery(FIND_USER_QUERY, {
    variables: { id: user.id },
  });
  const [open, setOpen] = useState<boolean>(false);

  const richTagClass = document.getElementsByClassName("ri-class-" + index);

  for (var i = 0; i < richTagClass.length; i++) {
    let name = richTagClass[i].innerHTML;
    name = name.replace("@", "");
    richTagClass[i].addEventListener("mouseenter", () => {
      handleMouseEnter(name);
    });
    richTagClass[i].addEventListener("mouseleave", (e) => {
      setOpen(false);
    });
  }

  function handleMouseEnter(name: string) {
    refetch({ id: name }).then((resp) => {
      const data = resp.data.user;
      setUser(data);
      setOpen(true);
    });
  }

  return (
    <>
      {open ? (
        <div className="rich-hover-tag shadow">
          {loading ? (
            <ReactLoading
              className="loading-react-loading"
              type="bars"
              color="black"
              height={"10%"}
              width={"10%"}
            ></ReactLoading>
          ) : (
            <>
              <div className="flex">
                <img src={queriedUser.PhotoProfile} alt="" />
                <p className="ml-2 color-fg">{queriedUser.name}</p>
              </div>
              <p className="color-invic">{queriedUser.email}</p>
            </>
          )}
        </div>
      ) : (
        ""
      )}

      <div className="rich-container">
        <div dangerouslySetInnerHTML={{ __html: a }} />
      </div>
    </>
  );
}
