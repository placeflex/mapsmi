import React, { forwardRef } from "react";
import dayjs from "dayjs";

import { DatePicker } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import classNames from "classnames";

// styles

import "./styles.scss";

interface DatePickerInterface {
  className?: string;
  onChange?: (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => void;
  onOk?: any;
  value?: string;
  label: string;
  ref?: React.ReactNode;
}

export const DatePickerComponent = forwardRef<DatePickerInterface, any>(
  ({ className, label, value, ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={label} className="block text-xs mb-2">
            {label}
          </label>
        )}

        <DatePicker
          showTime={{
            format: "HH:mm",
          }}
          format="YYYY-MM-DD HH:mm"
          onChange={props.onChange}
          className={classNames(
            "datepicker-input font-sans text-xs h-[40px]",
            className
          )}
          value={dayjs(value, "YYYY-MM-DD HH:mm")}
          popupClassName="datepicker-dropdown"
        />
      </>
    );
  }
);

DatePickerComponent.displayName = "DatePickerComponent";
