import './Rules.scss';
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

interface RulesProps {
  isInvalidPasswordCharacter: boolean;
  isInvalidPasswordLetter: boolean;
  isInvalidPasswordNumber: boolean;
}

export const Rules: React.FC<RulesProps> = ({
    isInvalidPasswordCharacter,
    isInvalidPasswordLetter,
    isInvalidPasswordNumber
  }) => {

  return (
    <ul className="rules">
      <li className={`item ${isInvalidPasswordCharacter ? '' : 'check'}`}>
        {
          isInvalidPasswordCharacter ?
            <FaRegCircle className="icon-circle" />
            :
            <FaCheckCircle className="icon-circle check" />
        }
        8 characters
      </li>
      <li className={`item ${isInvalidPasswordLetter ? '' : 'check'}`}>
        {
          isInvalidPasswordLetter ?
            <FaRegCircle className="icon-circle" />
            :
            <FaCheckCircle className="icon-circle check" />
        }
        1 uppercase letter
      </li>
      <li className={`item ${isInvalidPasswordNumber ? '' : 'check'}`}>
        {
          isInvalidPasswordNumber ?
            <FaRegCircle className="icon-circle" />
            :
            <FaCheckCircle className="icon-circle check" />
        }
        1 number
      </li>
    </ul>
  )
}