import { AutoComplete as AntdAutoComplete } from "antd";
import classNames from "classnames";

interface Option {
  value: string;
  label: string;
  locationData: any;
}

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
        <label htmlFor={label} className="block text-xs mb-2">
          {label}
        </label>
      )}

      <AntdAutoComplete
        options={options}
        className={classNames(className, "h-[40px]")}
        onSelect={onSelect}
        onSearch={onChange}
        placeholder={placeholder}
        allowClear={{ clearIcon: <div>X</div> }}
        defaultValue={value}
        {...props}
      />
    </>
  );
};
