interface FieldProps {
  label?: string;
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  autoComplete: string;
  value: string;
  onChange: any;
  name:string;
}
export const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  name
}: FieldProps) => {
  return (
    <div className="flex items-center mt-3 border-b-2 border-gray-200">
     {label &&<label htmlFor={id} className="text-cyan-200 w-[15%] mr-3">
        {label}
      </label>}
      <input
        className="py-3 bg-transparent text-base w-full text-black focus:ring-0 focus:outline-none placeholder-[#87bbfd]"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
