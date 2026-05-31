type SelectWithLabelProps = {
  field: string;
  label: string;
  handleChange: (field: string, value: string) => void;
  value: string;
  errors: { message: string; field: string }[];
  options: { value: string; label: string }[];
  handleOnBlur: (field: string, value: string) => void
};

export function SelectWithLabel({
  field,
  label,
  handleChange,
  handleOnBlur,
  value,
  errors,
  options,
}: SelectWithLabelProps) {
  const error = errors.find(err => err.field === field);

  return (
    <>
      <label htmlFor={field} className="text-secondary-normal text-sm">
        {label}
      </label>
      <select
        name={field}
        id={field}
        className={`w-full p-2 rounded-lg bg-background-normal border ${error ? 'border-error' : 'border-secondary-light/10'} text-secondary-normal focus:outline-secondary-light/20`}
        onChange={e => handleChange(field, e.target.value)}
        value={value}
        onBlur={e => handleOnBlur(field, e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && error.field === field && (
        <span className="text-error text-sm absolute left-0 -bottom-5">
          {error.message}
        </span>
      )}
    </>
  );
}
