import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { APIRequestMessages } from "../../services/auth/Auth";
import { CardPost } from "../../components/card/CardPost";
import DOMPurify from "dompurify";

const apiURLGet = APIRequestMessages.messagebyid;
const apiURLUpdate = APIRequestMessages.updatemessage;

export const PutMessage = () => {
  const [messages, setMessages] = useState<any>([]);
  const [title, setTitle] = useState(messages.title);
  const [titleValidError, setTitleValidError] = useState("");
  const [content, setContent] = useState(messages.content);
  const [contentValidError, setContentValidError] = useState("");

  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleTitleChange = () => {
    const reg = /^.{4,}$/;
    if (reg.test(messages.title && title) === false) {
      setTitleValidError("Title must be at least 5 characters!");
    } else if (reg.test(messages.title && title) === true) {
      setTitleValidError("");
    }
  };

  const handleMessageChange = () => {
    const reg = /^.{9,}$/;
    if (reg.test(messages.content && content) === false) {
      setContentValidError("Message must be at least 10 characters!");
    } else if (reg.test(messages.content && content) === true) {
      setContentValidError("");
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      const accessToken = await getAccessTokenSilently();

      await fetch(`${apiURLGet}${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMessages();
  }, [getAccessTokenSilently, id]);

  const htmlEncodeTitle = (dirty: any) => {
    const clean = DOMPurify.sanitize(dirty,  { USE_PROFILES: { html: false }});
    return clean;
  };

  const htmlEncodeBody = (dirty: any) => {
    const clean = DOMPurify.sanitize(dirty, { ALLOWED_TAGS: ["b", "i"] });
    return clean;
  };

  const updateMessage = async (e: any) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const url = `${apiURLUpdate}${id}`;
    const userName = user?.email;
    const date = messages.date;

    const post = {
      id: id,
      userName: userName,
      date: date,
      title: htmlEncodeTitle(title) || messages.title,
      content: htmlEncodeBody(content) || messages.content,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(post),
    })
      .then(function (response) {
        if (response.ok) {
          navigate(`/messages/details/${id}`);
          return response.text();
        }
        throw new Error("Something went wrong.");
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  function display() {
    return (
      <CardPost>
        <div className="img">
          <img src={require("../../assets/img/blog.png")} width="90" alt="" />
        </div>
        {messages.userName === user?.email ? (
          <form>
            <div className="card-body">
              <div className="title">Title:</div>
              <div className="form">
                <input
                  type="text"
                  name="title"
                  defaultValue={messages.title || title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    handleTitleChange();
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
                  defaultValue={messages.content || content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    handleMessageChange();
                  }}
                  placeholder="Write your message..."
                />
              </div>
              {contentValidError ? (
                <div className="error">{contentValidError}</div>
              ) : null}
              <div className="submit">
                {titleValidError === "" && contentValidError === "" ? (
                  <button onClick={updateMessage} type="submit" className="btn">
                    Update Message
                  </button>
                ) : (
                  <button disabled className="btn-disabled">
                    Fields must be valid!
                  </button>
                )}
              </div>
            </div>
          </form>
        ) : (
          <div className="notvalid">
            You are not authorized for this action!
          </div>
        )}
      </CardPost>
    );
  }

  return <>{display()}</>;
};
