import './Button.scss';

interface ButtonProps {
  isButtonDisabled: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({ isButtonDisabled, handleClick }) => {

  return (
    <button
      className="button"
      disabled={isButtonDisabled}
      onClick={handleClick}>Change Password
    </button>
  )
}