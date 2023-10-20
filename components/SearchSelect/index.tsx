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

// const onChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

// const onSearch = (value: string) => {
//   console.log("search:", value);
// };

import "./styles.scss";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

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
        <label htmlFor={label} className="block text-xs text-sm mb-2">
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
