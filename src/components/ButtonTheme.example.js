"use client";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useSettingsContext } from "@/contexts/SettingsContext";
import globalConfig from "@/configs/global";

const { CONSTANT } = globalConfig;
const ButtonTheme = ({ className = "" }) => {
  const { settings, setUp } = useSettingsContext();
  const checked = settings.theme === CONSTANT.THEME.DARK ? true : false;

  const changeTheme = (isChecked) => {
    if (isChecked) {
      return setUp({ theme: CONSTANT.THEME.DARK });
    }
    return setUp({ theme: CONSTANT.THEME.LIGHT });
  };

  return (
    <label
      className={`relative flex h-7 w-14 cursor-pointer items-center justify-between overflow-hidden rounded-full bg-purple-950 p-1 text-yellow-500 ${className}`}
    >
      <input
        type="checkbox"
        className="peer absolute opacity-0"
        checked={checked}
        onChange={(e) => changeTheme(e.target.checked)}
      />
      <FontAwesomeIcon
        icon={faMoon}
        className=" translate-y-7 transition duration-200 peer-checked:translate-y-0"
      />
      <FontAwesomeIcon
        icon={faSun}
        className="translate-y-0 transition duration-200 peer-checked:translate-y-7"
      />
      <span className="absolute h-5 w-5 rounded-full bg-white transition duration-300 peer-checked:translate-x-7"></span>
    </label>
  );
};
ButtonTheme.propTypes = {
  className: PropTypes.string,
};
export default ButtonTheme;
