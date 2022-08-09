import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./ToggleButton.scss";

const ToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <input
      onChange={handleChangeTheme}
      className="switch"
      type="checkbox"
    ></input>
  );
};
export default ToggleButton;
