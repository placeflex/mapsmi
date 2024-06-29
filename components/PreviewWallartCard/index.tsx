import Image from "next/image";
import classNames from "classnames";

// components
import { Button } from "@/components/Button";

interface Props {
  image?: any;
  imageAlt?: any;
  title?: String;
  description?: React.ReactElement;
  disabled?: boolean;
  className?: String;
}

export const PreviewWallartCard = ({
  image,
  imageAlt,
  title,
  description,
  disabled,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={classNames(
        "relative flex flex-col bg-primary shadow-md",
        className
      )}
    >
      <div className="w-full relative aspect-square">
        {disabled && (
          <div className="absolute bg-black/[0.5] z-20 w-full h-full top-0 flex items-center justify-center">
            <h3 className="text-body text-white">Cooming Soon</h3>
          </div>
        )}
        <Image
          src={image}
          alt="terra"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          priority={true}
        />

        {imageAlt && (
          <div className="transition w-full aspect-square absolute top-0 left-0 right-0 bottom-0 opacity-0 z-10 hover:opacity-100 mb-[2rem] from-gray-300">
            <Image
              src={imageAlt}
              alt="terra"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              priority={true}
            />

            <div className="h-full absolute overlay-gradient bottom-[0] flex p-[1rem] items-end left-[50%] translate-x-[-50%] w-full z-10">
              <Button
                // onClick={() => dispatch(handleShowProductModal())}
                type="button"
                color="primary"
                variant="contained"
                className="text-caption w-full absolute translate-y-[65%] left-0"
              >
                Створіть свій власний
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="py-[3rem] pb-[1rem] px-[1rem] flex flex-col">
        <h3 className="text-body">{title}</h3>

        {description}

        <span className="block mt-[.5rem] font-semibold text-caption">
          €44.99-79.99
        </span>
      </div>
    </div>
  );
};
