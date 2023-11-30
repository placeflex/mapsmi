import { Select } from "antd";

import classNames from "classnames";

interface SearchSelectProps {
  label?: string;
  className?: string;
  onChange?: (v: any) => void;
  value?: string;
  options?: any;
  placeholder?: string;
}

import "./styles.scss";

export const SearchSelect = ({
  label = "",
  className = "",
  options = [],
  onChange,
  placeholder,
  ...props
}: SearchSelectProps) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className="block text-xs mb-2">
          {label}
        </label>
      )}

      <Select
        // showSearch
        className={classNames(
          "search-select font-sans h-[40px] text-xs",
          className
        )}
        popupClassName="search-select-popup"
        options={options}
        onSearch={onChange}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
};
