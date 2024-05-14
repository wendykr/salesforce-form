import { useState, useEffect } from 'react';
import './Form.scss';
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { formatDate } from '../../helpers/helpers';
import { questionData } from '../../constants/questions';

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
        isInvalidAnswer
      ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }

  }, [registrationData, isInvalidPassword, isInvalidPasswordConfirm, isInvalidAnswer])

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
      <ul className="rule">
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

      <label><span className="mark">*</span> New Password
        <input
          className={`password ${registrationData.password.length > 0 ? validationStyledPassword ? 'red' : 'green' : ''}`}
          type="password"
          name="password"
          value={registrationData.password}
          onChange={handleChangePassword}
        />
        {
          (registrationData.password.length > 0) &&
            <span className={`validation__text ${validationStyledPassword ? 'red' : 'green'}`}>
              {
                validationStyledPassword ? 'Too weak' : 'Good'
              }
            </span>
        }
      </label>

      <label><span className="mark">*</span> Confirm New Password
        <input
          className={`password ${registrationData.passwordConfirm.length > 0 ? validationStyledPasswordConfirm ? 'red' : 'green' : ''}`}
          type="password"
          name="passwordConfirm"
          value={registrationData.passwordConfirm}
          onChange={handleChangePasswordConfirm}
        />
        {
          (registrationData.passwordConfirm.length > 0) &&
          <span className={`validation__text ${validationStyledPasswordConfirm ? 'red' : 'green'}`}>
              {
                validationStyledPasswordConfirm ? 'Passwords don\'t match' : 'Match'
              }
            </span>
        }
      </label>

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

      <label><span className="mark">*</span> Answer
        <input
          className="input"
          type="input"
          name="answer"
          value={registrationData.answer}
          onChange={handleChangeAnswer}
        />
      </label>

      <button
        className="button"
        disabled={isButtonDisabled}
        onClick={handleClick}>Change Password
      </button>

      <p className="form__footer">Password was last changed on {formatDate(new Date())}</p>
    </div>
  )
}