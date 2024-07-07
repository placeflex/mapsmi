import classNames from "classnames";

// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

import styles from "./Brand.module.scss";

export const OurBrand = () => {
  return (
    <div className={classNames(styles.ourBrand)}>
      <Container>
        <div className="flex flex-col justify-center items-end h-[80rem]">
          <h2 className="text-h2 text-primary mb-[1rem]">On sale right now!</h2>
          <h3 className="text-h3 text-primary mb-[1rem]">
            25% off on all posters
          </h3>
          <p className="text-body text-primary">
            And to go with that you also get 10% off all frames and hangers!
          </p>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            className="text-caption mt-[2rem]"
          >
            Design your own
          </Button>
        </div>
      </Container>
    </div>
  );
};
