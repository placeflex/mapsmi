import React from "react";
import { Switch } from "antd";

import "./styles.scss";

export const Switcher = ({ ...props }) => {
  return <Switch className="switcher" defaultChecked {...props} />;
};
