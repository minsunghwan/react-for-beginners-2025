import headerCss from "../css/Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={headerCss.container}>
      <h1 className={headerCss.logo}>
        <Link to="/"> Min's Movie</Link>
      </h1>
      <div className={headerCss.rightGroup}>
        <select className={headerCss.select}>
          <option>KOR</option>
          <option>ENG</option>
        </select>
        <button className={headerCss.login}>로그인</button>
      </div>
    </div>
  );
}

export default Header;
