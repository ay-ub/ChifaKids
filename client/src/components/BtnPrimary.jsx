import { Link } from "react-router-dom";

const btnStyle =
  "rounded-lg p-2  bg-p bg-ph transition font-bold  cursor-pointer text-white h-[40px] select-none flex gap-2 items-center justify-center";

function BtnPrimary({ path, text, btnFun, icon }) {
  return path ? (
    <Link to={path} className={btnStyle}>
      {icon} {text}
    </Link>
  ) : (
    <button
      className={btnStyle}
      onClick={() => {
        btnFun();
      }}
    >
      {icon}
      {text}
    </button>
  );
}

export default BtnPrimary;
