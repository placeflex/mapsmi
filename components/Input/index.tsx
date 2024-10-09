import { Input as InputComponent } from "antd";
import clsx from "clsx";

interface InputProps {
  label?: string;
  className?: string;
  onChange?: (v: any) => void;
  maxlength?: number;
  value?: string;
  placeholder?: string;
  labelClasses?: string;
  inputClasses?: string;
  required?: boolean;
  type?: string;
}

export const LabelWrapper = ({ label, labelClasses, required, children }) => {
  return (
    <label
      htmlFor={label}
      className={clsx("flex flex-col mb-2 text-caption", labelClasses)}
    >
      <span className="mb-[1rem]">
        {label}{" "}
        {required && (
          <abbr className="required text-error no-underline" title="required">
            *
          </abbr>
        )}
      </span>

      {children}
    </label>
  );
};

export const Input = ({
  label = "",
  labelClasses = "",
  className = "",
  placeholder,
  required = false,
  ...props
}: InputProps) => {
  return (
    <>
      {label ? (
        <LabelWrapper
          label={label}
          labelClasses={labelClasses}
          required={required}
        >
          <InputComponent
            required={required}
            placeholder={placeholder}
            id={label}
            className={clsx(
              "w-full rounded-none font-sans h-[40px]",
              className
            )}
            {...props}
          />
        </LabelWrapper>
      ) : (
        // <label
        //   htmlFor={label}
        //   className={clsx("flex flex-col mb-2 text-caption", labelClasses)}
        // >
        //   <span className="mb-[1rem]">
        //     {label}{" "}
        //     {required && (
        //       <abbr
        //         className="required text-error no-underline"
        //         title="required"
        //       >
        //         *
        //       </abbr>
        //     )}
        //   </span>

        // </label>
        <InputComponent
          required={required}
          placeholder={placeholder}
          id={label}
          className={clsx("w-full rounded-none font-sans h-[40px]", className)}
          {...props}
        />
      )}
    </>
  );
};
