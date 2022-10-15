import React from "react";
import Image from "next/image";

export const TodoCheckListItem = ({
  content,
  time,
  index,
  done,
  handleItemDelete,
  handleCompleteItem,
}) => {
  const iconSize = 20;
  return (
    <div
      onClick={(e) => {
        // console.log(e.target)
        if(e.target.alt != 'dragme' && e.target.alt != 'edit' && e.target.alt != 'remove'){
            handleCompleteItem(index);
        }
      }}
      className={`taskItem ${done ? `active` : ``}`}
      draggable="true"
    >
      <div className="leftside">
        <div className="dragger">
          <Image
            width={iconSize}
            height={iconSize}
            src="/svg/dragger.svg"
            alt="dragme"
          />
        </div>
        <div className="task-content">
          <p>{content}</p>
        </div>
      </div>
      <div className="rightside">
        <div className="buttons">
          {/* <Image
            width={iconSize}
            height={iconSize}
            src="/svg/edit.svg"
            alt="edit"
          /> */}
          <Image
            onClick={() => {
              handleItemDelete(index);
            }}
            width={iconSize}
            height={iconSize}
            src="/svg/delete-alt.svg"
            alt="remove"
          />
        </div>
        <div className="time">
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
};
