import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardPost } from "../../components/card/CardPost";
import { APIRequestMessages } from "../../services/auth/Auth";
import { useAuth0 } from "@auth0/auth0-react";
import Moment from "moment";
import DOMPurify from "dompurify";

const apiURLPost = APIRequestMessages.postmessage;

export const PostMessage = () => {
  const [title, setTitle] = useState("");
  const [titleValidError, setTitleValidError] = useState("");
  const [content, setContent] = useState("");
  const [contentValidError, setContentValidError] = useState("");

  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const handleTitleChange = (title: string) => {
    const reg = /^.{4,}$/;
    if (reg.test(title) === false) {
      setTitleValidError("Title must be at least 5 characters!");
    } else if (reg.test(title) === true) {
      setTitleValidError("");
    }
  };

  const handleMessageChange = (content: string) => {
    const reg = /^.{9,}$/;
    if (reg.test(content) === false) {
      setContentValidError("Message must be at least 10 characters!");
    } else if (reg.test(content) === true) {
      setContentValidError("");
    }
  };

  const htmlEncodeTitle = (dirty: any) => {
    const clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: false } });
    return clean;
  };

  const htmlEncodeBody = (dirty: any) => {
    const clean = DOMPurify.sanitize(dirty, { ALLOWED_TAGS: ["b", "i"] });
    return clean;
  };

  const onSubmitPost = async (e: any) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const url = `${apiURLPost}`;
    const userName = user?.email;
    const date = Moment().format("dddd D MMMM YYYY");

    const post = {
      userName: userName,
      date: date,
      title: htmlEncodeTitle(title),
      content: htmlEncodeBody(content),
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(post),
    })
      .then(function (response) {
        if (response.ok) {
          navigate("/messages");
          return response.text();
        }
        throw new Error("Something went wrong.");
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  return (
    <CardPost>
      <div className="img">
        <img src={require("../../assets/img/blog.png")} width="90" alt="" />
      </div>
      <form>
        <div className="card-body">
          <div className="title">Title:</div>
          <div className="form">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleTitleChange(title);
              }}
              placeholder="Write your title..."
            />
          </div>
          {titleValidError ? (
            <div className="error">{titleValidError}</div>
          ) : null}
          <div className="title">Message:</div>
          <div className="form">
            <textarea
              name="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                handleMessageChange(content);
              }}
              placeholder="Write your message..."
            />
          </div>
          {contentValidError ? (
            <div className="error">{contentValidError}</div>
          ) : null}
          <div className="submit">
            {title.length > 4 && content.length > 9 ? (
              <button onClick={onSubmitPost} type="submit" className="btn">
                Create Message
              </button>
            ) : (
              <button disabled className="btn-disabled">
                Fields must be valid!
              </button>
            )}
          </div>
        </div>
      </form>
    </CardPost>
  );
};
