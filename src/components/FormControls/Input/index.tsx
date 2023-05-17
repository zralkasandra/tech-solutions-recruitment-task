import { Element } from "./styled";

const TextInput: React.FC<{
  id: string;
  type: string;
  value: string;
  required: boolean;
  placeholder?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
}> = ({ id, type, value, required, placeholder = "", onChange, onBlur }) => {
  return (
    <Element
      id={id}
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
