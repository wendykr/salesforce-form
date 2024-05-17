import './Input.scss';

interface InputProps {
  borderStyled?: boolean;
  validationStyled?: boolean;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
    borderStyled,
    validationStyled,
    type,
    name,
    value,
    onChange
  }) => {

  return (
    <input
      className={`password ${ borderStyled && (value.length > 0 ? validationStyled ? 'red' : 'green' : '') }`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}