import { useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

// routes
import { profileRoutes as routes } from "@/constants/routers";

// stores
import { useDispatch } from "react-redux";
import { handleLogout, handleSaveUser } from "@/redux/user";

// components
import { SearchSelect } from "@/components/SearchSelect";

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
          .catch(({ error }) => {
            handleLogoutUser();
            toast.error(error);
          });
      } catch (error) {
        console.log("GET ME ERROR:", error);
      }
    } else {
      handleLogoutUser();
    }
  }, []);

  const items = [
    ...profileRoutes.map(({ route, title }, index) => {
      return {
        key: index,
        label: (
          <Link href={route} key={index} legacyBehavior>
            <a
              className={`${
                router.pathname === route ? "selected" : ""
              } w-full flex items-center py-2 `}
            >
              {title}
            </a>
          </Link>
        ),
      };
    }),
    {
      key: "logout",
      label: (
        <button
          onClick={handleLogoutUser}
          className="text-error py-2 w-full text-left"
          type="button"
        >
          Sign Out
        </button>
      ),
    },
  ];

  const currentRoute = profileRoutes.find(
    route => route.route === router.pathname
  );

  return (
    <div className="flex-col py-4 max-w-7xl mx-auto md:flex md:flex-row md:py-10">
      <SearchSelect
        options={items}
        className="w-full mb-5 md:hidden"
        value={currentRoute?.title}
      />
      <div className="hidden flex-col justify-start min-w-[80px] items-start mr-10 md:flex">
        {profileRoutes.map(({ route, title }, index) => {
          return (
            <Link href={route} key={index} legacyBehavior>
              <a
                className={`${
                  router.pathname === route ? "text-wine" : ""
                } mb-2 `}
              >
                {title}
              </a>
            </Link>
          );
        })}

        <button
          onClick={handleLogoutUser}
          className="mt-8 text-error "
          type="button"
        >
          Sign Out
        </button>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};
