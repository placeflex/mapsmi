import React, { forwardRef } from "react";
import dayjs from "dayjs";

import { DatePicker } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import clsx from 'clsx';

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
  format?: string;
}

export const DatePickerComponent = forwardRef<DatePickerInterface, any>(
  ({ className, label, value, format = "HH:mm", ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={label} className="block  mb-2">
            {label}
          </label>
        )}

        <DatePicker
          showTime={{
            format: format,
          }}
          format="YYYY-MM-DD HH:mm"
          onChange={props.onChange}
          className={clsx(
            "datepicker-input font-sans h-[40px]",
            className
          )}
          value={value ? dayjs(value, "YYYY-MM-DD HH:mm") : null}
          popupClassName="datepicker-dropdown"
          {...props}
        />
      </>
    );
  }
);

DatePickerComponent.displayName = "DatePickerComponent";
