import Navbar from "./Navbar.jsx";
import Image from "next/image";
import Link from "next/link";

function Layout({ children }) {
  const iconSize = 25;
  return (
    <>
      <Navbar />
      <main className="main body">
        <div className="back-button">
          <Link href="/">
            <a>
              <Image
                width={iconSize}
                height={iconSize}
                src="/svg/arrow-left.svg"
                alt="go back"
              />
              <p>Back</p>
            </a>
          </Link>
        </div>
        <div className="content">{children}</div>
      </main>
    </>
  );
}

export default Layout;
