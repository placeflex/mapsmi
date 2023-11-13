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

import "./SearchSelect.module.scss";

export const SearchSelect = ({
  label = "",
  className = "",
  options = [],
  onChange,
  placeholder,
}: SearchSelectProps) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className="block text-xs mb-2">
          {label}
        </label>
      )}

      <Select
        showSearch
        className={classNames(className, "font-sans", "h-[40px] text-xs")}
        options={options}
        onSearch={onChange}
        placeholder={placeholder}
      />
    </>
  );
};
