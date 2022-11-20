import React, { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { APIRequestMessages } from "../../services/auth/Auth";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";

const apiURLGetAll = APIRequestMessages.allmessages;

export const GetMessagesThree = () => {
  const [messages, setMessages] = useState<any>([]);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getMessages = async () => {
      const accessToken = await getAccessTokenSilently();
      const url = `${apiURLGetAll}`;

      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.slice(-3).reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMessages();
  }, [getAccessTokenSilently, messages]);

  function display() {
    return messages.map((messages: any) => {
      return (
        <Card key={messages.id}>
          <NavLink to={`/messages/details/${messages.id}`}>
            <div className="img">
              {messages.userName === user?.email ? (
                <img
                  src={require("../../assets/img/userimg.png")}
                  width="70"
                  alt=""
                />
              ) : (
                <img
                  src={require("../../assets/img/blog.png")}
                  width="70"
                  alt=""
                />
              )}
            </div>
            <div className="userinfo">
              <div className="date">{messages.date}</div>
              <div className="author">
                {messages.userName.length > 40
                  ? `${messages.userName.substring(0, 40)}...`
                  : messages.userName}
              </div>
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
          </NavLink>
        </Card>
      );
    });
  }

  return <>{display()}</>;
};
