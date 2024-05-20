import { useState, useEffect } from 'react';
import './Form.scss';
import { formatDate } from '../../helpers/helpers';
import { questionData } from '../../constants/questions';
import { Button } from '../Button/Button';
import { Rules } from '../Rules/Rules';
import { ChangeEventWithElement, FormRow } from '../FormRow/FormRow';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegistrationDataStructure {
  password: string;
  passwordConfirm: string;
  question: number;
  answer: string;
}

export interface QuestionStructure {
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
        isInvalidPasswordNumber ||
        (registrationData.password !== registrationData.passwordConfirm)
      ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }

  }, [registrationData, isInvalidPassword, isInvalidPasswordConfirm, isInvalidAnswer, isInvalidPasswordCharacter, isInvalidPasswordLetter, isInvalidPasswordNumber])

  const handleChangePassword = (event: ChangeEventWithElement) => {
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

  const handleChangePasswordConfirm = (event: ChangeEventWithElement) => {
    setRegistrationData({ ...registrationData, passwordConfirm: event.target.value.trim() });
    (event.target.value.trim())
      ?
        setIsInvalidPasswordConfirm(false)
      : 
        setIsInvalidPasswordConfirm(true);
  };

  const handleChangeQuestion = (event: ChangeEventWithElement) => {
    const newQuestionValue = Number(event.target.value);
    setRegistrationData({ ...registrationData, question: newQuestionValue, answer: '' });
    setIsInvalidAnswer(true);
  };

  const handleChangeAnswer = (event: ChangeEventWithElement) => {
    setRegistrationData({ ...registrationData, answer: event.target.value.trim() });
    (event.target.value.trim())
      ?
        setIsInvalidAnswer(false)
      : 
        setIsInvalidAnswer(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    toast.success(`Success! Your password was changed.`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });

    setRegistrationData({
      password: '',
      passwordConfirm: '',
      question: 1,
      answer: ''
    });

    setIsButtonDisabled(true);
  
    setIsInvalidPassword(false);
    setIsInvalidPasswordConfirm(false);
    setIsInvalidAnswer(false);
  
    setIsInvalidPasswordCharacter(true);
    setIsInvalidPasswordLetter(true);
    setIsInvalidPasswordNumber(true);
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

      <FormRow
        labelName="Security Question"
        name="question"
        value={registrationData.question}
        onChange={handleChangeQuestion}
        question={question}
      />

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