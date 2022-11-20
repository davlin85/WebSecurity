import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardPost } from "../../components/card/CardPost";
import { APIRequestImages } from "../../services/auth/Auth";
import { useAuth0 } from "@auth0/auth0-react";
import Moment from "moment";
import DOMPurify from "dompurify";

const apiURLPost = APIRequestImages.postimage;

const defaultImageSrc = require("../../assets/img/defaultimage.png");

const initialFieldValues = {
  userName: "",
  date: "",
  title: "",
  imageName: "defaultName",
  imageSrc: defaultImageSrc,
  imageFile: null as any,
};

export const PostImage = () => {
  const [values, setValues] = useState(initialFieldValues);
  const [titleValidError, setTitleValidError] = useState("");
  const [imageValidError, setImageValidError] = useState("");

  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const imageType = /image\/(png|jpg|jpeg)/i;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    const reg = /^.{4,}$/;
    if (reg.test(values.title) === false) {
      setTitleValidError("Title must be at least 5 characters!");
    } else if (reg.test(values.title) === true) {
      setTitleValidError("");
    }
  };

  const showPreview = (e: any) => {
    const imageFile = e.target.files[0];
    if (imageFile && imageFile.type.match(imageType)) {
      const reader = new FileReader();
      reader.onload = (x: any) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null as any,
        imageSrc: defaultImageSrc,
      });
      setImageValidError("You must attach an valid image!");
    }
  };

  const htmlEncodeTitle = (dirty: any) => {
    const clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: false } });
    return clean;
  };

  const onSubmitPost = async (e: any) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const url = `${apiURLPost}`;
    const userName = user?.email;
    const date = Moment().format("dddd D MMMM YYYY");

    const formData = new FormData();
    formData.append("userName", userName as string);
    formData.append("date", date as string);
    formData.append("title", htmlEncodeTitle(values.title));
    formData.append("imageName", values.imageName);
    formData.append("imageFile", values.imageFile);

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          navigate("/images");
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
      <form autoComplete="off" noValidate>
        <div className="card-image">
          <img src={values.imageSrc} width="350" alt="" />
        </div>
        <div className="card-body">
          <div className="title">Title:</div>
          <div className="form">
            <input
              name="title"
              value={values.title}
              type="text"
              onChange={handleInputChange}
              placeholder="Write your title..."
            />
          </div>
          {titleValidError ? (
            <div className="error">{titleValidError}</div>
          ) : null}
          <div className="title">Image:</div>
          <div className="form">
            <input
              id="imageFile"
              accept=".png, .jpg"
              type="file"
              onChange={showPreview}
            />
          </div>
          {values.imageFile === null ? (
            <div className="error">{imageValidError}</div>
          ) : (
            <></>
          )}
          <div className="submit">
            {values.title.length > 4 && values.imageFile !== null ? (
              <button onClick={onSubmitPost} type="submit" className="btn">
                Upload Image
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
