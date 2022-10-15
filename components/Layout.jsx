import Navbar from "./Navbar.jsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router.js";

function Layout({ children }) {
  const iconSize = 25;
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main className={`main body ${router.asPath === '/' ? `notop` : ``}`}>
        {router.asPath != "/" && (
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
        )}
        <div className="content">{children}</div>
      </main>
    </>
  );
}

export default Layout;
