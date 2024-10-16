import { useRouter } from "next/router";
import Image from "next/image";
// components
import PrivateRoute from "@/components/PrivateRoute";
import { ProfileLayout } from "@/modules/Profile/ProfileLayout";
import { Layout as PageLayout } from "@/components/Layout";
import { Container } from "@/components/Container";
import { MyImageComponent } from "@/components/MyImageComponent";

// helpers
import { toast } from "react-toastify";

// constants
import { productNames } from "@/constants/constants";

// apis
import { api } from "@/axios";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";
// import {
//   handleDeleteProject,
//   handleLogout,
//   handleSaveUser,
// } from "@/redux/user";

// icons
import Empty from "@/public/icons/empty.svg";
import Delete from "@/public/icons/delete.svg";

const UserProjects = () => {
  const dispatch = useDispatch();
  const user = useTypedSelector(({ user }) => user.isAdmin);
  const router = useRouter();

  // const handleLogoutUser = () => {
  //   dispatch(handleLogout());
  //   router.push("/");
  // };

  // const handleDeleteMyProject = (id: string) => {
  //   const callback = () => {
  //     api
  //       .get("/me")
  //       .then(user => {
  //         dispatch(handleSaveUser(user));
  //       })
  //       .catch(({ error }) => {
  //         handleLogoutUser();
  //         toast.error(error);
  //       });
  //   };

  //   dispatch(handleDeleteProject({ id, callback }));
  // };

  return (
    <PrivateRoute>
      <PageLayout>
        {/* <Container>
          <ProfileLayout>
            {user?.projects.length === 0 ? (
              <div className="flex flex-col items-center text-center">
                <Empty width={100} height={100} className="opacity-30" />
              </div>
            ) : (
              <>
                <h1 className="mb-5 font-bold  leading-none">Projects</h1>
                <div className="flex flex-wrap -ml-2 -mr-2">
                  {user?.projects?.map((project, index) => {
                    const size = project.selectedAttributes.size.name;
                    const frame = project.selectedAttributes.frame.material;
                    const material = project.selectedAttributes.material;
                    const price = project.price;

                    return (
                      <div
                        key={index}
                        className="w-full p-2 rounded sm:w-1/2 xl:w-1/3"
                      >
                        <div className="flex bg-primary">
                          <div
                            className="min-w-[180px] h-[180px] flex items-center justify-center bg-light"
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
                            <MyImageComponent
                              src={project.path}
                              width={100}
                              height={100}
                              quality={20}
                              alt="preview"
                              priority={true}
                            />
                          </div>

                          <div className="p-3 flex flex-col w-full">
                            <div className="grow">
                              <h3 className="text-[0.6rem] mb-1">
                                Product:{" "}
                                {productNames[Number(project.productId)]}
                              </h3>
                              <h3 className="text-[0.6rem] mb-1">
                                Material: {material.name}
                              </h3>
                              <h3 className="text-[0.6rem] mb-1">
                                Size: {size}
                              </h3>
                              <h3 className="text-[0.6rem] mb-1">
                                Frame: {frame}
                              </h3>
                              <h3 className="text-[0.6rem] mb-1 font-bold">
                                Price: {price}$
                              </h3>
                            </div>

                            <div className="flex gap-2">
                              <button
                                className="flex flex-col items-center justify-center text-error"
                                onClick={() =>
                                  handleDeleteMyProject(project.uuid)
                                }
                              >
                                <Delete
                                  width={20}
                                  stroke="#ff0000"
                                  fill="#ff0000"
                                />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </ProfileLayout>
        </Container> */}
      </PageLayout>
    </PrivateRoute>
  );
};

export default UserProjects;
