import React from "react";
import AuthChecker from "@/helpers/authChecker";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  return <AuthChecker>{children}</AuthChecker>;
};

export default PrivateRoute;
