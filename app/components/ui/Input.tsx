import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, icon, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label
            className='block text-sm font-medium text-gray-700 mb-1'
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className='relative'>
          {icon && (
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              block w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-colors
              ${icon ? "pl-10" : "pl-3"}
              ${
                error
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 placeholder-gray-500 focus:ring-[#7ABA28] focus:border-[#7ABA28]"
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
