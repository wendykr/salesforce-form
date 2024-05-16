import { useState, useEffect } from 'react';
import './Form.scss';
import { formatDate } from '../../helpers/helpers';
import { questionData } from '../../constants/questions';
import { Button } from '../Button/Button';
import { Rules } from '../Rules/Rules';
import { FormRow } from '../FormRow/FormRow';

interface RegistrationDataStructure {
  password: string;
  passwordConfirm: string;
  question: number;
  answer: string;
}

interface QuestionStructure {
  id: number;
  text: string;
}

export const Form = () => {
  const [registrationData, setRegistrationData] = useState<RegistrationDataStructure>
    ({
      password: '',
      passwordConfirm: '',
      question: 1,
      answer: ''
    });

  const [question] = useState<QuestionStructure[]>(questionData);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
  const [isInvalidPasswordConfirm, setIsInvalidPasswordConfirm] = useState<boolean>(false);
  const [isInvalidAnswer, setIsInvalidAnswer] = useState<boolean>(false);

  const [isInvalidPasswordCharacter, setIsInvalidPasswordCharacter] = useState<boolean>(true);
  const [isInvalidPasswordLetter, setIsInvalidPasswordLetter] = useState<boolean>(true);
  const [isInvalidPasswordNumber, setIsInvalidPasswordNumber] = useState<boolean>(true);

  const validationStyledPassword = isInvalidPasswordCharacter || isInvalidPasswordLetter || isInvalidPasswordNumber;
  const validationStyledPasswordConfirm = registrationData.password !== registrationData.passwordConfirm;

  useEffect(() => {
    if (registrationData.password === '' ||
        registrationData.passwordConfirm === '' ||
        registrationData.answer === '' ||
        isInvalidPassword ||
        isInvalidPasswordConfirm ||
        isInvalidAnswer ||
        isInvalidPasswordCharacter ||
        isInvalidPasswordLetter ||
        isInvalidPasswordNumber
      ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }

  }, [registrationData, isInvalidPassword, isInvalidPasswordConfirm, isInvalidAnswer, isInvalidPasswordCharacter, isInvalidPasswordLetter, isInvalidPasswordNumber])

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({ ...registrationData, password: event.target.value.trim() });
    (event.target.value.trim().length >= 8)
      ?
        setIsInvalidPasswordCharacter(false)
      :
        setIsInvalidPasswordCharacter(true);

    (/[A-Z]/.test(event.target.value))
      ?
        setIsInvalidPasswordLetter(false)
      :
        setIsInvalidPasswordLetter(true);

    (/\d/.test(event.target.value))
      ?
        setIsInvalidPasswordNumber(false)
      :
        setIsInvalidPasswordNumber(true);

    (event.target.value.trim())
      ?
        setIsInvalidPassword(false)
      :
        setIsInvalidPassword(true);
  };

  const handleChangePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({ ...registrationData, passwordConfirm: event.target.value.trim() });
    (event.target.value.trim())
      ?
        setIsInvalidPasswordConfirm(false)
      : 
        setIsInvalidPasswordConfirm(true);
  };

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuestionValue = Number(event.target.value);
    setRegistrationData({ ...registrationData, question: newQuestionValue, answer: '' });
    setIsInvalidAnswer(true);
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({ ...registrationData, answer: event.target.value.trim() });
    (event.target.value.trim())
      ?
        setIsInvalidAnswer(false)
      : 
        setIsInvalidAnswer(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log('done');
  }

  return (
    <div className="form">
      <p className="form__header">Enter a new password for <span className="bold">kiwebow991@losvtn.com</span>. Make sure to include at least:</p>
      <Rules
        isInvalidPasswordCharacter={isInvalidPasswordCharacter}
        isInvalidPasswordLetter={isInvalidPasswordLetter}
        isInvalidPasswordNumber={isInvalidPasswordNumber}
      />

      <FormRow
        labelName="New Password"
        validationStyled={validationStyledPassword}
        borderStyled
        type="password"
        name="password"
        value={registrationData.password}
        onChange={handleChangePassword}
      />

      <FormRow
        labelName="Confirm New Password"
        validationStyled={validationStyledPasswordConfirm}
        borderStyled
        type="password"
        name="passwordConfirm"
        value={registrationData.passwordConfirm}
        onChange={handleChangePasswordConfirm}
      />

      <label>Security Question
        <select
          className="select"
          name="question"
          onChange={handleChangeQuestion}
        >
          {
            question.length > 0 && question.map(question => <option className="option" value={question.id} key={question.id}>{question.text}</option>)
          }
        </select>
      </label>

      <FormRow
        labelName="Answer"
        type="input"
        name="anwser"
        value={registrationData.answer}
        onChange={handleChangeAnswer}
      />

      <Button isButtonDisabled={isButtonDisabled} handleClick={handleClick} />

      <p className="form__footer">Password was last changed on {formatDate(new Date())}</p>
    </div>
  )
}