import './Form.scss';

export const Form = () => {

  return (
    <div className="form">

        <label>Username
          <input
            className="input"
            type="input"
            name="username"
          />
        </label>

        <label>Password
          <input
            className="password"
            type="password"
            name="password"
          />
        </label>

        <label>Select answer
          <select
            className="select"
            name="answer"
          >
            <option className="option" value="">--Please choose an option--</option>
            <option className="option" value="answer1">Answer 1</option>
            <option className="option" value="answer2">Answer 2</option>
          </select>
        </label>

        <label className="label__row">
          <input className="checkbox" type="checkbox" />
          Remember me
        </label>
      
      <button className="button">Log In</button>
    </div>
  )
}