import { useState } from "react";
import Image from "next/image";

export const MyImageComponent = ({ ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && <div>Loading...</div>}
      <Image
        alt=""
        onLoadingComplete={() => setLoading(false)}
        src={props.src}
        {...props}
      />
    </div>
  );
};
