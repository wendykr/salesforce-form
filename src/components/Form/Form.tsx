import { useState } from 'react';
import './Form.scss';
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { formatDate } from '../../helpers/helpers';
import { answerData } from '../../constants/answer';

interface AnswerStructure {
  id: number;
  text: string;
}

export const Form = () => {
  const [answer] = useState<AnswerStructure[]>(answerData);

  return (
    <div className="form">
      <p className="small">Enter a new password for <span className="bold">kiwebow991@losvtn.com</span>. Make sure to include at least:</p>
      <ul className="rule">
        <li className="item"><FaRegCircle className="icon-circle" />8 characters</li>
        <li className="item check"><FaCheckCircle className="icon-circle check" />1 letter</li>
        <li className="item"><FaRegCircle className="icon-circle" />1 number</li>
      </ul>

      <label><span className="mark">*</span> New Password
        <input
          className="password"
          type="password"
          name="password"
        />
      </label>

      <label><span className="mark">*</span> Confirm New Password
        <input
          className="password"
          type="password"
          name="passwordConfirm"
        />
      </label>

      <label>Security Question
        <select
          className="select"
          name="question"
        >
          {
            answer.length > 0 && answer.map(answer => <option className="option" value={answer.id} key={answer.id}>{answer.text}</option>)
          }
        </select>
      </label>

      <label><span className="mark">*</span> Answer
        <input
          className="input"
          type="input"
          name="answer"
        />
      </label>

      <button className="button" disabled>Change Password</button>

      <p className="footer">Password was last changed on {formatDate(new Date())}</p>
    </div>
  )
}