import { AutoComplete as AntdAutoComplete } from "antd";
import clsx from 'clsx';

import Delete from "@/public/icons/close.svg";
interface AutoCompleteProps {
  label?: string;
  className?: string;
  onChange?: (v: any) => void;
  onSelect?: (v: any, opt: Object) => void;
  options: any;
  placeholder?: string;
  value?: Object;
  required?: boolean;
  labelClasses?: string;
}

import "./styles.scss";

export const AutoComplete = ({
  label = "",
  labelClasses = "",
  className = "",
  options = [],
  onChange,
  onSelect,
  placeholder = "",
  value,
  required,
  ...props
}: AutoCompleteProps) => {
  return (
    <>
      {label ? (
        <label
          htmlFor={label}
          className={clsx(
            "flex flex-col mb-2 text-caption",
            labelClasses
          )}
        >
          <span className="mb-[1rem]">
            {label}{" "}
            {required && (
              <abbr
                className="required text-error no-underline"
                title="required"
              >
                *
              </abbr>
            )}
          </span>

          <AntdAutoComplete
            options={options}
            className={clsx("autocomplete h-[40px] w-full", className)}
            popupClassName="autocomplete-popup"
            onSelect={onSelect}
            onSearch={onChange}
            placeholder={placeholder}
            allowClear={{ clearIcon: <Delete width={20} stroke="#000" /> }}
            defaultValue={value}
            {...props}
          />
        </label>
      ) : (
        <AntdAutoComplete
          options={options}
          className={clsx("autocomplete h-[40px]", className)}
          popupClassName="autocomplete-popup"
          onSelect={onSelect}
          onSearch={onChange}
          placeholder={placeholder}
          allowClear={{ clearIcon: <Delete width={20} stroke="#000" /> }}
          defaultValue={value}
          {...props}
        />
      )}
    </>
  );
};
