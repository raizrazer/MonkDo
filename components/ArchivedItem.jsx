import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ArchivedItem({ title, index, date, handleDelete,handleUnarchive }) {
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
          <p>{date}</p>
        </div>
        <div className="buttons">
          <Image
            onClick={() => handleUnarchive(index)}
            width={iconSize}
            height={iconSize}
            src="/svg/archive.svg"
            alt="archive todo"
          />
          <Image
            onClick={() => handleDelete(index)}
            width={iconSize}
            height={iconSize}
            src="/svg/delete-alt.svg"
            alt="delete todo"
          />
        </div>
      </div>
        <div className="todoItem_Bottom">
          <div className="totdoTitle">
            <p>{title}</p>
          </div>
        </div>
    </div>
  );
}
