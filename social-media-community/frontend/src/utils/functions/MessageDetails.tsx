import React, { useEffect, useState } from "react";
import { CardDetails } from "../../components/card/CardDetails";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useParams } from "react-router-dom";
import { APIRequestMessages } from "../../services/auth/Auth";
import DOMPurify from "dompurify";

const apiURLGet = APIRequestMessages.messagebyid;
const apiURLDelete = APIRequestMessages.deletemessage;

export const MessageDetails = () => {
  const [messages, setMessages] = useState<any>([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

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

  const deleteMessage = async () => {
    const accessToken = await getAccessTokenSilently();

    await fetch(`${apiURLDelete}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };

  function display() {
    return (
      <CardDetails>
        <div className="img">
          {messages.userName === user?.email ? (
            <img
              src={require("../../assets/img/userimg.png")}
              width="90"
              alt=""
            />
          ) : (
            <img src={require("../../assets/img/blog.png")} width="90" alt="" />
          )}
        </div>
        <div className="userinfo">
          <div className="date">{messages.date}</div>
          <div className="author">{messages.userName}</div>
        </div>
        <div
          className="title"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(messages.title, {
              USE_PROFILES: { html: false },
            }),
          }}
        />
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(messages.content, {
              ALLOWED_TAGS: ["b", "i"],
            }),
          }}
        />
        {messages.userName === user?.email ? (
          <div className="edit">
            <div className="update">
              <NavLink to={`/messages/update/${messages.id}`}>
                Update Message
              </NavLink>
            </div>
            <div className="delete">
              <NavLink to="/messages" onClick={() => deleteMessage()}>
                Delete Message
              </NavLink>
            </div>
          </div>
        ) : (
          <></>
        )}
      </CardDetails>
    );
  }

  return <>{display()}</>;
};
