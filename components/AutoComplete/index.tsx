import { AutoComplete as AntdAutoComplete } from "antd";
import classNames from "classnames";

import Delete from "@/public/icons/close.svg";
interface AutoCompleteProps {
  label?: string;
  className?: string;
  onChange?: (v: any) => void;
  onSelect?: (v: any, opt: Object) => void;
  options: any;
  placeholder: string;
  value?: Object;
}

import "./styles.scss";

export const AutoComplete = ({
  label = "",
  className = "",
  options = [],
  onChange,
  onSelect,
  placeholder = "",
  value,
  ...props
}: AutoCompleteProps) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className="block mb-2 text-caption">
          {label}
        </label>
      )}

      <AntdAutoComplete
        options={options}
        className={classNames("autocomplete h-[40px]", className)}
        popupClassName="autocomplete-popup"
        onSelect={onSelect}
        onSearch={onChange}
        placeholder={placeholder}
        allowClear={{ clearIcon: <Delete width={20} stroke="#000" /> }}
        defaultValue={value}
        {...props}
      />
    </>
  );
};
