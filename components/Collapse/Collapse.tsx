import React, { useState, FC } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

import "./styles.scss";
import clsx from "clsx";

interface AccordionItem {
  title: string | React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode | String;
  shortTitle?: string;
  classNames?: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: FC<AccordionProps> = ({
  items,
  ...props
}): React.ReactNode => {
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
      {items.map(({ icon, content, title, shortTitle, classNames }, index) => (
        <Panel
          header={
            <span className="text-bodySmall flex items-center gap-[0.5rem] lg:gap-[1rem] collapse-custom-header">
              {icon && (
                <span className="w-[4rem] h-[4rem] flex items-center justify-center bg-secondary/[.5] rounded-[1rem]">
                  {icon}
                </span>
              )}
              <span className="collapse-custom-header__title">{title}</span>
              <span className="collapse-custom-header__title collapse-custom-header__title-mobile">
                {shortTitle}
              </span>
            </span>
          }
          key={index}
          className={clsx("bg-primary border-0", classNames)}
        >
          <div className="bg-primary collapse-custom-content">{content}</div>
        </Panel>
      ))}
    </Collapse>
  );
};
