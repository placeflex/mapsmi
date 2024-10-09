import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTypedSelector } from "@/stores/store";

const AuthChecker = ({ children }) => {
  const router = useRouter();
  const isUserLogged = useTypedSelector(({ user }) => user.isAdmin);

  useEffect(() => {
    const isLogged = localStorage.getItem("token") || isUserLogged;

    if (!isLogged) {
      router.push("/");
    }
  }, []);

  return children;
};

export default AuthChecker;
