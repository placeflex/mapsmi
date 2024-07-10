import { Tabs } from "antd";

import clsx from 'clsx';

import "./styles.scss";

export const TabsPanel = ({ items, onChange, className, ...rest }: any) => {
  return (
    <Tabs
      items={items}
      type="card"
      className={clsx(className, "w-full tab-panel")}
      onChange={onChange}
      {...rest}
    />
  );
};
