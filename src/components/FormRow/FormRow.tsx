import './FormRow.scss';

interface FormRowProps {
  labelName: string;
  validationStyled?: boolean;
  borderStyled?: boolean
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormRow: React.FC<FormRowProps> = ({
    labelName,
    validationStyled,
    borderStyled,
    type,
    name,
    value,
    onChange
  }) => {

  return (
    <label><span className="mark">*</span> {labelName}
      <input
        className={`password ${ borderStyled && (value.length > 0 ? validationStyled ? 'red' : 'green' : '') }`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {
        borderStyled &&
          (value.length > 0) &&
            <span className={`validation__text ${validationStyled ? 'red' : 'green'}`}>
              {
                validationStyled ? 'Too weak' : 'Good'
              }
            </span>
      }
    </label>
  )
}