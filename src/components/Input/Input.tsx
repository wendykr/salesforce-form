import './Input.scss';

interface InputProps {
  borderStyled?: boolean;
  validationStyled?: boolean;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({
    borderStyled,
    validationStyled,
    type,
    name,
    value,
    onChange,
    inputRef
  }) => {

  return (
    <input
      className={`password ${ borderStyled && (value.length > 0 ? validationStyled ? 'red' : 'green' : '') }`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      ref={inputRef}
    />
  )
}