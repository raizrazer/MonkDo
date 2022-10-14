import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

// ! MAIN TODO which is shown in the main page
export default function MainTodoItem({title,index,date}) {
  const iconSize = 20;
  const handleDelete = () =>{
    //? Delete Function
    const todosMainList = JSON.parse(localStorage.getItem('todosMain'));
    const filtered = todosMainList.filter((item,indexTodo) => indexTodo!=index)
    localStorage.setItem('todosMain',JSON.stringify(filtered));
  }
  return (
    <div className="todoItem">
            <div className="todoItem_Top">
              <div className="date">
                <Image src="/svg/tasks-alt.svg" width={iconSize} height={iconSize} alt="date" />
                <p>{date}</p>
              </div>
              <div className="buttons">
                <Image src="/svg/archive.svg" width={iconSize} height={iconSize} alt="archive todo" />
                <Image onClick={handleDelete} src="/svg/delete-alt.svg" width={iconSize} height={iconSize} alt="delete todo" />
              </div>
            </div>
            <Link href={`/todos/${index}`}>
            <a>
            <div className="todoItem_Bottom">
              <div className="totdoTitle">
                <p>{title}</p>
              </div>
            </div>
            </a>
            </Link>
    </div>
  )
}
