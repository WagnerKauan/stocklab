

type InputWithLabelProps = {
  field: string;
  label: string;
  type?: string;
  placeholder: string;
  handleChange: (field: string, value: string) => void;
  handleOnBlur?: (field: string, value: string) => void;
  value: string;
  errors: { message: string; field: string }[];
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
      <label htmlFor={field} className="text-secondary-normal">
        {label}
      </label>
      <input
        type={type}
        id={field}
        placeholder={placeholder}
        className={`w-full p-2 rounded-lg bg-background-normal border 
           text-secondary-normal focus:outline-secondary-light/20 ${error ? 'border-error' : 'border-secondary-light/10'}`}
        onChange={e => handleChange(field, e.target.value)}
        value={value}
        onBlur={e => handleOnBlur?.(field, e.target.value)}
      />

      {error && error.field === field && (
        <span className="text-error text-sm absolute left-0 -bottom-5">{error.message}</span>
      )}
    </>
  );
}
