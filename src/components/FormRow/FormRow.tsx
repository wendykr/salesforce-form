import { QuestionStructure } from '../Form/Form';
import { Input } from '../Input/Input';
import './FormRow.scss';

export type ChangeEventWithElement = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>;

interface FormRowProps {
  labelName: string;
  validationStyled?: boolean;
  borderStyled?: boolean
  type?: string;
  name: string;
  value?: string;
  onChange: (event: ChangeEventWithElement) => void;
  question?: QuestionStructure[];
}

export const FormRow: React.FC<FormRowProps> = ({
    labelName,
    validationStyled,
    borderStyled,
    type,
    name,
    value,
    onChange,
    question
  }) => {

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
                value={value || ''}
                onChange={onChange}
              />
              {
                borderStyled &&
                  (value && value.length > 0) &&
                  <span className={`validation__text ${validationStyled ? 'red' : 'green'}`}>
                    {
                      validationStyled ? 'Too weak' : 'Good'
                    }
                  </span>
              }
            </>)
            :
            <select
              className="select"
              name="question"
              onChange={onChange}
            >
              {
                question && question.length > 0 && question.map(question => <option className="option" value={question.id} key={question.id}>{question.text}</option>)
              }
            </select>
        }
      </label>
    )
}