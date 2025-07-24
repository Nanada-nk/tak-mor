

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  divClassName = "",
  className = "",
  error,
  register,
  ...rest
}) => {
  let inputType = type;
 
  

  return (
    <div className={divClassName}>
      {label && (
        <label htmlFor={name} className="font-bold text-gray-700 text-sm">
          {label}
        </label>
      )}
      <div>
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`textarea textarea-neutral textarea-sm py-1 min-h-[32px] focus:outline-0 ${className}`}
            required={required}
            {...(register ? register(name) : {})}
            {...rest}
          />
        ) : (
          <>
            <input
              id={name}
              name={name}
              value={type === "file" ? undefined : value}
              onChange={onChange}
              type={inputType}
              className={`input input-sm text-sm py-1 h-8 focus:outline-0 focus:ring-0 ${type === "file" ? "file-input file-input-sm" : ""} ${className}`}
              required={required}
              {...(register ? register(name) : {})}
              {...rest}
            />
          
          </>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message || error}
        </p>
      )}
    </div>
  );
};

export default FormInput;