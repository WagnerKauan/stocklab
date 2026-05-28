"use client";

type InputWithLabelProps = {
  field: string;
  label: string;
  type?: string;
  placeholder: string;
  handleChange: (field: string, value: string) => void;
  handleOnBlur?: (field: string, value: string) => void;
  value: string;
  errors: { message: string; field: string; id?: string }[];
};

export function InputWithLabel({
  field,
  label,
  type = 'text',
  placeholder,
  handleChange,
  value,
  handleOnBlur,
  errors,
}: InputWithLabelProps) {
  const error = errors.find(err => err.field === field);

  return (
    <>
      <label
        htmlFor={field}
        className="text-secondary-normal text-sm font-medium"
      >
        {label}
      </label>
      <input
        type={type}
        id={field}
        placeholder={placeholder}
        className={`w-full px-2 py-1.5 rounded-lg bg-background-normal/50 border transition-colors outline-none
           text-secondary-normal focus:border-primary-normal/80 focus:shadow-sm focus:shadow-primary-normal/20 ${error ? 'border-error' : 'border-secondary-light/20'}
        `}
        onChange={e => handleChange(field, e.target.value)}
        value={value}
        onBlur={e => handleOnBlur?.(field, e.target.value)}
      />

      {error && error.field === field && (
        <span className="text-error text-sm absolute left-0 -bottom-5">
          {error.message}
        </span>
      )}
    </>
  );
}
