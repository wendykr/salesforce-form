import { RuleItem } from '../RuleItem/RuleItem';
import './Rules.scss';

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
      <RuleItem
        invalidRule={isInvalidPasswordCharacter}
        name="8 characters"
      />
      <RuleItem
        invalidRule={isInvalidPasswordLetter}
        name="1 uppercase letter"
      />
      <RuleItem
        invalidRule={isInvalidPasswordNumber}
        name="1 number"
      />
    </ul>
  )
}