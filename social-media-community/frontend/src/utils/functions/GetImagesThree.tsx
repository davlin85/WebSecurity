import React, { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { APIRequestImages } from "../../services/auth/Auth";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";

const apiURLGetAll = APIRequestImages.allimages;

export const GetImagesThree = () => {
  const [images, setImages] = useState<any>([]);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getImages = async () => {
      const accessToken = await getAccessTokenSilently();
      const url = `${apiURLGetAll}`;

      await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
            setImages(data.slice(-3).reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getImages();
  }, [getAccessTokenSilently]);

  function display() {
    return images.map((images: any) => {
      return (
        <Card key={images.id}>
          <NavLink to={`/images/details/${images.id}`}>
            <div className="img">
              {images.userName === user?.email ? (
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
              <div className="date">{images.date}</div>
              <div className="author">
                {images.userName.length > 40
                  ? `${images.userName.substring(0, 40)}...`
                  : images.userName}
              </div>
            </div>
            <div
              className="title"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(images.title, {
                  USE_PROFILES: { html: false },
                }),
              }}
            />
            <div className="card-image">
              <img src={images.imageSrc} width="250" alt="" />
            </div>
          </NavLink>
        </Card>
      );
    });
  }

  return <>{display()}</>;
};
