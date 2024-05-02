import React from "react";
import Image from "next/image";
import classNames from "classnames";

// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

// stores
import { useDispatch } from "react-redux";
import { handleShowProductModal } from "@/redux/modals";

// styles
import styles from "./Banner.module.scss";

export const Banner = () => {
  const dispatch = useDispatch();

  return (
    <div className={classNames("poster", styles.poster)}>
      <Container>
        <div
          className={classNames(
            `flex flex-col items-start justify-center w-full ml-0`,
            styles.posterInner
          )}
        >
          <h1 className="text-h1 font-bold text-white mb-[2rem]">
            Спеціальні постери для значущих моментів
          </h1>
          <p className=" text-white text-bodySmall mb-[2rem]">
            Зробіть свій дім більшим собою за допомогою унікальних принтів і
            виробів, які справді виражають вашу сутність. Велике мистецтво
            розповідає історію, і ми впевнені, що у вас є кілька дивовижних
            історій, якими ви можете поділитися зі світом.
          </p>
          <Button
            onClick={() => dispatch(handleShowProductModal())}
            type="button"
            color="secondary"
            className="text-caption"
          >
            Design your own
          </Button>
        </div>
      </Container>
    </div>
  );
};
