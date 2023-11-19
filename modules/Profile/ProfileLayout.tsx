import { useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

// routes
import { profileRoutes as routes } from "@/constants/routers";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { handleLogout, handleSaveUser } from "@/redux/user";

// apis
import { api } from "@/axios";

// helpers
import { toast } from "react-toastify";

export const profileRoutes = [
  { title: "My Account", route: routes.profile },
  { title: "Projects", route: routes.projects },
];

export const ProfileLayout = ({ children }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(handleLogout());
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        api
          .get("/me")
          .then(user => {
            dispatch(handleSaveUser(user));
          })
          .catch(({ response }) => {
            handleLogoutUser();
            toast.error(response?.data?.error);
            // console.log("GET ME ERROR:", response.data.error);
          });
      } catch (error) {
        console.log("GET ME ERROR:", error);
      }
    } else {
      handleLogoutUser();
    }
  }, []);

  return (
    <div className="flex px-4 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col min-w-[250px]">
        {profileRoutes.map(({ route, title }, index) => {
          return (
            <Link href={route} key={index} legacyBehavior>
              <a className={router.pathname === route ? "font-bold" : ""}>
                {title}
              </a>
            </Link>
          );
        })}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};
