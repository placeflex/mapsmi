import React, { useState } from "react";

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
            className="w-full text-left text-xs rounded-lg p-4 bg-bg"
            onClick={() => toggleItem(index)}
          >
            {item.title}
          </button>
          {activeItem === index && <div className="p-4">{item.content}</div>}
        </div>
      ))}
    </>
  );
};
