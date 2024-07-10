import { FC } from "react";
import clsx from 'clsx';
import Image from "next/image";
import ball from "@/public/top-selling-categories/basketballjpg.png";

interface ITopSellCategoriesProps {
  title: string;
  src: string;
  className: string;
}

export const TopSellCategoriesCard: FC<ITopSellCategoriesProps> = ({
  title,
  src,
  className,
}) => {
  return (
    <div
      className={clsx(
        "relative w-[25rem] h-[25rem] cursor-pointer group overflow-hidden rounded-2xl bg-primary",
        className
      )}
    >
      <h3 className="absolute top-0 p-8 text-caption z-10">{title}</h3>
      <div className="absolute inset-0 transition-transform duration-300 ease-in-out transform group-hover:scale-125 group-hover:rotate-[-10deg]">
        {/* <Image src={src} alt={title} layout="fill" objectFit="cover" /> */}
      </div>
    </div>
  );
};
