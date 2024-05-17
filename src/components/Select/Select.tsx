import { QuestionStructure } from '../Form/Form';
import { ChangeEventWithElement } from '../FormRow/FormRow';
import './Select.scss';

interface SelectProps {
  onChange: (event: ChangeEventWithElement) => void;
  question: QuestionStructure[] | undefined;
}

export const Select: React.FC<SelectProps> = ({ onChange, question }) => {

  return (
    <select
      className="select"
      name="question"
      onChange={onChange}
    >
    {
      question && question.length > 0 && question.map(question => <option className="option" value={question.id} key={question.id}>{question.text}</option>)
    }
    </select>
  )
}