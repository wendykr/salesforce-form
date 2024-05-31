import { QuestionStructure } from '../Form/Form';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import './FormRow.scss';

export type ChangeEventWithElement = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>;

interface FormRowProps {
  labelName: string;
  validationStyled?: boolean;
  borderStyled?: boolean
  type?: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEventWithElement) => void;
  question?: QuestionStructure[];
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const FormRow: React.FC<FormRowProps> = ({
    labelName,
    validationStyled,
    borderStyled,
    type,
    name,
    value,
    onChange,
    question,
    inputRef
  }) => {

    const isString = (value: string | number): value is string => {
      return typeof value === 'string';
    }

    return (
      <label>
        {
          (type === 'password' || type === 'input') && <span className="mark">*</span>
        }
        {' '}{labelName}
        {
          (type === 'password' || type === 'input') ?
            (<>
              <Input
                validationStyled={validationStyled}
                borderStyled={borderStyled}
                type={type}
                name={name}
                value={String(value)}
                onChange={onChange}
                inputRef={inputRef}
              />
              {
                borderStyled &&
                  (isString(value)) && (value && value.length > 0) &&
                  <span className={`validation__text ${validationStyled ? 'red' : 'green'}`}>
                    {
                      name === 'password'
                      ? (validationStyled ? 'Too weak' : 'Good')
                      : (validationStyled ? 'Passwords don\'t match' : 'Match')
                    }
                  </span>
              }
            </>)
            :
            <Select onChange={onChange} question={question} value={Number(value)} />
        }
      </label>
    )
}