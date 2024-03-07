import { Tabs } from "antd";
import type { TabsProps } from "antd";

import classNames from "classnames";

import "./styles.scss";

export const TabsPanel = ({ items, onChange, className, ...rest }: any) => {
  return (
    <Tabs
      items={items}
      className={classNames(className, "w-full tab-panel")}
      onChange={onChange}
      centered
      {...rest}
    />
  );
};
