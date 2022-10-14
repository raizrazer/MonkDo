import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ArchivedItem({ title, index }) {
  const iconSize = 20;
  return (
    <div className="archivetodoItem">
      <div className="todoItem_Top">
        <div className="date">
          <Image
            width={iconSize}
            height={iconSize}
            src="/svg/tasks-alt.svg"
            alt="date"
          />
          <p>27-05-2022</p>
        </div>
        <div className="buttons">
          <Image
            width={iconSize}
            height={iconSize}
            src="/svg/archive.svg"
            alt="archive todo"
          />
          <Image
            width={iconSize}
            height={iconSize}
            src="/svg/delete-alt.svg"
            alt="delete todo"
          />
        </div>
      </div>
      <Link href={`/archives/${index=4}`}>
        <div className="todoItem_Bottom">
            <div className="totdoTitle">
            <p>Build a new app</p>
            </div>
        </div>
      </Link>
    </div>
  );
}
