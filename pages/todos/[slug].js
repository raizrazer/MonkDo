import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function TodoItem() {
  const router = useRouter();
  const { slug } = router.query;
  const iconSize = 20;
  const [todoItem,setTodoItem] = useState('');

  useEffect(()=>{
    const getTodoItemData = async () =>{
      const todoList = await JSON.parse(localStorage.getItem('todosMain'));
      const todoItem = todoList[slug];
      setTodoItem(todoItem);
    }
    getTodoItemData();
  },[slug])

  return (
    <Layout>
        <div className="todoCheckListMain">
            <div className="todoMainEnter">
              <div className="todoMainEnter_Top">
                <div className="title">
                  <p>{(todoItem) ? `${todoItem.title}  [${todoItem.hour>12 ? todoItem.hour%12 : todoItem.hour}:${todoItem.minute<10 ? "0"+((todoItem.minute).toString()) : todoItem.minute} ${(todoItem.hour>12)? `PM` : `AM`}] [${todoItem.day}-${todoItem.month}-${todoItem.year}]` : `Loading` }</p>
                </div>
                <div className="rightside">
                  <div className="buttons">
                    <Image width={iconSize} height={iconSize} src="/svg/archive.svg" alt="archive" />
                    <Image width={iconSize} height={iconSize} src="/svg/delete-alt.svg" alt="delete" />
                  </div>
                  <div className="percentage">
                    <p>5%</p>
                  </div>
                </div>
              </div>
              <div className="todoMainEnter_Bottom">
                <div className="taskInput">
                  <input
                    type="text"
                    name="createtodo"
                    id="createTask"
                    placeholder="Type the task..."
                  />
                  <Image width={iconSize} height={iconSize} src="/svg/ui-add.svg" alt="add" />
                </div>
  
                <div className="taskItem" draggable="true">
                  <div className="leftside">
                    <div className="dragger">
                      <Image width={iconSize} height={iconSize} src="/svg/dragger.svg" alt="dragme" />
                    </div>
                    <div className="task-content">
                      <p>Code the developer</p>
                    </div>
                  </div>
                  <div className="rightside">
                    <div className="buttons">
                      <Image width={iconSize} height={iconSize} src="/svg/edit.svg" alt="edit" />
                      <Image width={iconSize} height={iconSize} src="/svg/delete-alt.svg" alt="remove" />
                    </div>
                    <div className="time"><p>11:53 PM</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  )
}
