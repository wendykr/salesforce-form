import './RuleItem.scss';
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

interface RuleItemProps {
  invalidRule: boolean;
  name: string;
}

export const RuleItem: React.FC<RuleItemProps> = ({ invalidRule, name }) => {
  return (
    <li className={`ruleItem ${invalidRule ? '' : 'check'}`}>
    {
      invalidRule ?
        <FaRegCircle className="icon-circle" />
        :
        <FaCheckCircle className="icon-circle check" />
    }
    {name}
    </li>
  )
}