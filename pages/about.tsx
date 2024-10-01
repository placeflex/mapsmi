import { Layout } from "@/components/Layout";

import { AboutUs } from "@/modules/About/AboutUs";
import { AboutSteps } from "@/modules/About/Steps";

const About = () => {
  return (
    <Layout headerProps={{ classNames: "bg-secondary" }} scroll={true}>
      <AboutUs />

      <div className="mt-[6rem] lg:mt-[12rem]">
        <AboutSteps />
      </div>
    </Layout>
  );
};

export default About;
