import { useRouter } from "next/router";
import Image from "next/image";
// components
import PrivateRoute from "@/components/PrivateRoute";
import { ProfileLayout } from "@/modules/Profile/ProfileLayout";
import { Layout as PageLayout } from "@/components/Layout";
import { Container } from "@/components/Container";

// helpers
import { productNames } from "@/constants/constants";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { handleLogout, handleSaveUser } from "@/redux/user";

const UserProjects = () => {
  const dispatch = useDispatch();
  const user = useTypedSelector(({ user }) => user.user);
  const router = useRouter();

  return (
    <PrivateRoute>
      <PageLayout>
        <Container>
          <ProfileLayout>
            <div className="grid  xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {user?.projects?.map((project, index) => {
                const size = project.selectedAttributes.size.name;

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
                    className="flex p-2 bg-white"
                  >
                    <div className="min-w-[180px] h-[180px] flex items-center justify-center bg-light">
                      <img
                        src={project.path}
                        alt="preview"
                        className="w-[140px]  h-[140px] object-contain"
                      />
                    </div>

                    <div className="flex flex-col px-3">
                      <div className="grow">
                        <h3 className="text-[0.6rem] mb-1">
                          Product: {productNames[Number(project.productId)]}
                        </h3>
                        <h3 className="text-[0.6rem] mb-1">Material: -</h3>
                        <h3 className="text-[0.6rem] mb-1">Size: {size}</h3>
                      </div>

                      <div>
                        <button>DELETE</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ProfileLayout>
        </Container>
      </PageLayout>
    </PrivateRoute>
  );
};

export default UserProjects;
