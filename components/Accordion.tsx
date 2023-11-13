import React, { useState } from "react";

// icons
import Arrow from "@/public/icons/arrow.svg";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveItem(index);
  };

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          <button
            className="flex items-center justify-between w-full text-left text-xs p-2 text-black"
            onClick={() => toggleItem(index)}
          >
            {item.title}

            <Arrow
              width={15}
              className={`${activeItem === index && "rotate-180"} transition`}
            />
          </button>
          {activeItem === index && <div className="py-4 px-2">{item.content}</div>}
        </div>
      ))}
    </>
  );
};
