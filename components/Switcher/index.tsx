import React from "react";
import { Switch } from "antd";

import "./styles.scss";

export const Switcher = ({ ...props }) => {
  return <Switch size="small" className="switcher" defaultChecked {...props} />;
};
