import React, { useEffect, useState } from "react";
import { CardDetails } from "../../components/card/CardDetails";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useParams } from "react-router-dom";
import { APIRequestImages } from "../../services/auth/Auth";
import DOMPurify from "dompurify";

const apiURLGet = APIRequestImages.imagebyid;
const apiURLDelete = APIRequestImages.deleteimage;

export const ImageDetails = () => {
  const [images, setImages] = useState<any>([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  useEffect(() => {
    const getImages = async () => {
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
          setImages(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getImages();
  }, [getAccessTokenSilently, id]);

  const deleteImage = async () => {
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

  function onClick(url: any) {
    window.open(images.imageSrc, "_blank");
  }

  function display() {
    return (
      <CardDetails>
        <div className="img">
          {images.userName === user?.email ? (
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
          <div className="date">{images.date}</div>
          <div className="author">{images.userName}</div>
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
          <img src={images.imageSrc} width="380" alt="" />
        </div>
        {images.userName === user?.email ? (
          <div className="edit">
            <div className="update">
              <NavLink
                to={`/images/details/${images.id}`}
                download
                onClick={onClick}
              >
                Download Image
              </NavLink>
            </div>
            <div className="delete">
              <NavLink to="/images" onClick={() => deleteImage()}>
                Delete Image
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="edit">
          <div className="update">
            <NavLink
              to={`/images/details/${images.id}`}
              download
              onClick={onClick}
            >
              Download Image
            </NavLink>
          </div>
          <div className="delete">
          </div>
        </div>
        )}
      </CardDetails>
    );
  }

  return <>{display()}</>;
};
