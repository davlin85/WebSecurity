import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { WebbRouter } from "./WebbRouter";
import { SplashRouter } from "./SplashRouter";
import Loading from "../components/loading/Loading";

export const RootRouter = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return <>{!isAuthenticated ? <SplashRouter /> : <WebbRouter />}</>;
};
