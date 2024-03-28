import { useNavigate } from "react-router-dom";

interface NavButtonProps {
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label }) => {
  const navigate = useNavigate();

  const handleClick = (label: string) => {
    navigate(`/${label.toLowerCase()}`);
  };
  return <button onClick={() => handleClick(label)}>{label}</button>;
};
export default NavButton;
