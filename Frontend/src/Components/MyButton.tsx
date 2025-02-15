import { ReactElement } from "react";


interface ButtonProps {
  varient: "primary" | "secondary" | "third";
  text: string;
  starticon?: ReactElement; // Optional icon
  onClick?: () => void;
}

const varientClass = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-200 text-purple-600 hover:bg-purple-300",
  third: "bg-red-400 text-white hover:bg-red-500 "
};

const defaultStyle = "px-4 py-2 rounded-md flex items-center  transition duration-200 ease-in-out";

const MyButton = ({ varient, text, starticon, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={(defaultStyle + " " + varientClass[varient])}
      type="button"
      aria-label={text}
    >
      {starticon && <div className="m-1">{starticon}</div>}
      <div className="m-1">{text}</div>
    </button>
  );
};

export default MyButton;
