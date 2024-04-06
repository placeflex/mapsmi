import { Input as InputComponent } from "antd";

interface InputProps {
  label?: string;
  className?: string;
  onChange?: (v: any) => void;
  maxlength?: number;
  value?: string;
  placeholder?: string;
}

export const Input = ({
  label = "",
  className = "",
  placeholder,
  ...props
}: InputProps) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className="block mb-2 text-caption">
          {label}
        </label>
      )}

      <InputComponent
        placeholder={placeholder}
        id={label}
        className={`w-full rounded-none  font-sans h-[40px] ${className}`}
        {...props}
      />
    </>
  );
};
