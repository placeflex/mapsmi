import React from "react";
import Image from "next/image";
import clsx from "clsx";

// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

// stores
import { useDispatch } from "react-redux";
import { handleShowProductModal } from "@/redux/modals";

import pos from "@/public/home/newbrand.jpg";

// styles
import styles from "./Banner.module.scss";

export const Banner = () => {
  const dispatch = useDispatch();

  return (
    <div className={clsx("poster", styles.poster)}>
      <Container>
        <div
          className={clsx(
            `flex flex-col items-start justify-center w-full py-[4rem]`,
            styles.posterInner
          )}
        >
          <h1 className="text-h3 text-primary mb-[2rem] font-semibold">
            Your Memories,
            <br />
            Mapped Masterfully
          </h1>
          <p className="text-primary text-bodySmall mb-[2rem] font-semibold">
            Cherish your most treasured memories with our three distinct types
            of maps.
          </p>
          <Button
            onClick={() => dispatch(handleShowProductModal())}
            type="button"
            color="primary"
            className="text-caption"
          >
            Get Started
          </Button>
        </div>
      </Container>
    </div>
  );
};
