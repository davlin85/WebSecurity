import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { UserInfo } from "../components/userinfo/UserInfo";
import { Messages } from "../views/webb/messages/Messages";
import { Home } from "../views/webb/Home";
import { Images } from "../views/webb/images/Images";
import { CreateMessage } from "../views/webb/messages/CreateMessage";
import { ViewMessage } from "../views/webb/messages/ViewMessage";
import { MessageUpdate } from "../views/webb/messages/MessageUpdate";
import { CreateImage } from "../views/webb/images/CreateImage";
import { ViewImage } from "../views/webb/images/ViewImage";

export const WebbRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <UserInfo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/create" element={<CreateMessage />} />
        <Route path="/messages/details/:id" element={<ViewMessage />} />
        <Route path="/messages/update/:id" element={<MessageUpdate />} />
        <Route path="/images" element={<Images />} />
        <Route path="/images/create" element={<CreateImage />} />
        <Route path="/images/details/:id" element={<ViewImage />} />
      </Routes>
    </BrowserRouter>
  );
};
