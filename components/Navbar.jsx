import Image from "next/image";
import logo from "../public/svg/logo.svg";
import archive from "../public/svg/archive.svg";
import stats from "../public/svg/chart-bar-graph.svg";
import darkMode from "../public/svg/sun-alt.svg";
import Link from "next/link";

function Navbar() {
  let iconSize = 25;
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link href="/">
            <a>
              <Image
                src={logo}
                width={iconSize}
                height={iconSize}
                alt="MonkDo Home"
              ></Image>
              <p>MonkDo</p>
            </a>
          </Link>
        </div>
        <div className="nav">
          <div className="archive">
            <Link href="/archives">
              <a>
                <Image
                  src={archive}
                  width={iconSize}
                  height={iconSize}
                  alt="Archives"
                ></Image>
                <p>Archives</p>
              </a>
            </Link>
          </div>
          <div className="stats">
            <Link href="/statistics">
              <a>
                <Image
                  src={stats}
                  width={iconSize}
                  height={iconSize}
                  alt="Stats"
                ></Image>
                <p>Stats</p>
              </a>
            </Link>
          </div>
          <span className="darkmode">
            <Image
              src={darkMode}
              width={iconSize}
              height={iconSize}
              alt="DarkMode"
            ></Image>
          </span>
        </div>
      </div>
    </>
  );
}

export default Navbar;
