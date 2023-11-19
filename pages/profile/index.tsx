import { useEffect } from "react";
import { useRouter } from "next/router";

// components
import PrivateRoute from "@/components/PrivateRoute";
import { ProfileLayout } from "@/modules/Profile/ProfileLayout";
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

  return (
    <PrivateRoute>
      <PageLayout>
        <Container>
          <ProfileLayout>
            <div>
              <h1>USER PROFILE</h1>
              <h1>EMAIL: {user.email}</h1>
              <h2>NAME: {user.name}</h2>

              <div>
                <h3>PROJECTS</h3>
              </div>

              <button onClick={handleLogoutUser}>LOGOUT</button>
            </div>
          </ProfileLayout>
        </Container>
      </PageLayout>
    </PrivateRoute>
  );
};

export default UserProfile;
