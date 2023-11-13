import { useEffect } from "react";
import { useRouter } from "next/router";

// components
import PrivateRoute from "@/components/PrivateRoute";
import { Layout as PageLayout } from "@/components/Layout";
import { Container } from "@/components/Container";

import { productsVariations } from "@/constants/constants";

// apis
import { api } from "@/axios";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { handleLogout, handleSaveUser } from "@/redux/user";

const UserProfile = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const user = useTypedSelector(({ user }) => user.user);

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
            console.log("GET ME ERROR:", response.data.error);
          });
      } catch (error) {
        console.log("GET ME ERROR:", error);
      }
    } else {
      handleLogoutUser();
    }
  }, []);

  return (
    <PrivateRoute>
      <PageLayout>
        <Container>
          <div>
            <h1>USER PROFILE</h1>
            <h1>EMAIL: {user.email}</h1>
            <h2>NAME: {user.name}</h2>

            <div>
              <h3>PROJECTS</h3>

              <div className="flex bg-wine w-1/5">
                {user?.projects?.map((project, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push({
                          pathname: "/editor",
                          query: {
                            product_id: project.productId,
                            id: project.uuid,
                          },
                        });
                      }}
                    >
                      <h5>date: {project.date}</h5>
                      <b>id: {project.uuid}</b>
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={handleLogoutUser}>LOGOUT</button>
          </div>
        </Container>
      </PageLayout>
    </PrivateRoute>
  );
};

export default UserProfile;
