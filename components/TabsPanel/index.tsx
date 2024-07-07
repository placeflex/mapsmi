import { Tabs } from "antd";

import classNames from "classnames";

import "./styles.scss";

export const TabsPanel = ({ items, onChange, className, ...rest }: any) => {
  return (
    <Tabs
      items={items}
      type="card"
      className={classNames(className, "w-full tab-panel")}
      onChange={onChange}
      {...rest}
    />
  );
};
