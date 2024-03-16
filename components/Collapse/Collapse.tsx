import React, { useState } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

import "./styles.scss";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode | String;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items, ...props }) => {
  const [activeItem, setActiveItem] = useState(0);

  const toggleItem = (index: any) => {
    setActiveItem(index);
  };

  return (
    <Collapse
      accordion
      activeKey={activeItem}
      onChange={toggleItem}
      expandIconPosition={"end"}
      bordered={false}
      className="flex flex-col gap-[1rem] bg-transparent"
      {...props}
    >
      {items.map(({ icon, content, title }, index) => (
        <Panel
          header={
            <span className="text-bodySmall flex items-center gap-[1rem]">
              {icon && (
                <span className="w-[4rem] h-[4rem] flex items-center justify-center bg-secondary/[.5] rounded-[1rem]">
                  {icon}
                </span>
              )}
              <span>{title}</span>
            </span>
          }
          key={index}
          className="bg-white border-0"
        >
          <div className="bg-white">{content}</div>
        </Panel>
      ))}
    </Collapse>
  );
};
