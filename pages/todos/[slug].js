import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TodoCheckListItem } from "../../components/Todos/TodoCheckListItem";

// * TODO ITEM CHECKLIST

export default function TodoItem() {
  const router = useRouter();
  const { slug } = router.query;
  const iconSize = 20;

  // * Main Todo Item Title and Other Meta Data
  const [todoItem, setTodoItem] = useState();

  // * todoInputValue from the checklist Input
  const [todoInputValue, setTodoInputValue] = useState("");
  // const [todoData, setTodoData] = useState("");
  useEffect(() => {
    const getTodoItemData = () => {
      const todoList = JSON.parse(localStorage.getItem("todosMain"));
      const todoItem = todoList[slug];
      setTodoItem(todoItem);
    };
    getTodoItemData();
  }, [slug]);

  //* HANDLES THE showPercentage on the PERCENTAGE OF COMPLETETION
  const showPercentage = () => {
    const filtered = todoItem.data.filter((item) => item.done===true)
    const completed = filtered.length;
    const total = todoItem.data.length;
    const percentage = Math.floor((completed/total)*100);
    return `${(total!=0 ? percentage : `0`)}%`
  }
  //* HANDLES THE SUMBIT of CREATE A TODO
  const handleClick = (e) => {
    if (e.key === "Enter") {
      if (todoInputValue !== "") {
        const date = new Date();
        // ? MAIN VALUE of the input creation
        const todoInputtedValue = {
          content: todoInputValue,
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          done:false,
        };
        const todoList = JSON.parse(localStorage.getItem("todosMain"));
        todoList[slug].data.push(todoInputtedValue);
        localStorage.setItem("todosMain", JSON.stringify(todoList));
        setTodoInputValue("");
        setTodoItem(todoList[slug]);
      }
    }
  };

  //* HANDLES THE DELETE BUTTON FUNCTIONS OF THE MAIN TODO LIST ITEM
  const handleDelete = (index) =>{
    //* Delete Function
    if(confirm(`Are you sure you want delete this "${todoItem.title}" ?`)){
      const todosMainList = JSON.parse(localStorage.getItem('todosMain'));
      const filtered = todosMainList.filter((item,indexTodo) => indexTodo!=index)
      localStorage.setItem('todosMain',JSON.stringify(filtered));
      router.push('/')
    }
  }
  //* HANDLES THE ARCHIVE BUTTON FUNCTIONS OF THE MAIN TODO LIST ITEM
  const handleArchive = (index) => {
    const todosMainList = JSON.parse(localStorage.getItem('todosMain'));
    //* Get the archive Item.
    const archiveItem = todosMainList[index];
    //* Add it to the archive List, If the archive exist just push else, create one and push.
    if(JSON.parse(localStorage.getItem('archivedList'))){
      const archivedList = JSON.parse(localStorage.getItem('archivedList'));
      archivedList.push(archiveItem);
      localStorage.setItem('archivedList',JSON.stringify(archivedList));
    }
    else{
      localStorage.setItem('archivedList',JSON.stringify([]));
      const archivedList = JSON.parse(localStorage.getItem('archivedList'));
      archivedList.push(archiveItem);
      localStorage.setItem('archivedList',JSON.stringify(archivedList));
    }
    //* Delete it from the main list
    const filtered = todosMainList.filter((item,indexTodo) => indexTodo!=index)
    localStorage.setItem('todosMain',JSON.stringify(filtered));
    router.push('/')
    // setTodoItem(filtered)
  }

  //* HANDLES THE ITEM DELETE FUNCTION
  const handleItemDelete = (index) => {
    const todosMain = JSON.parse(localStorage.getItem('todosMain'));
    const filtered = todosMain[slug].data.filter((item,indexCheckList)=> !(indexCheckList===index));
    todosMain[slug].data = filtered;
    localStorage.setItem('todosMain',JSON.stringify(todosMain))
    setTodoItem(todosMain[slug])
  }
  //* HANDLES THE DONT/STRIKE FUNCTION
  const handleCompleteItem = (index) => {
    const todosMain = JSON.parse(localStorage.getItem('todosMain'));
    todosMain[slug].data[index].done = !(todosMain[slug].data[index].done);
    localStorage.setItem('todosMain',JSON.stringify(todosMain))
    setTodoItem(todosMain[slug])
  }

  return (
    <Layout>
      {todoItem && (
        <div className="todoCheckListMain">
          <div className="todoMainEnter">
            <div className="todoMainEnter_Top">
              <div className="title">
                <p>
                  {todoItem
                    ? `${todoItem.title}`
                    : `Loading`}
                </p>
              </div>
              <div className="rightside">
                <p>{`[${
                        (todoItem.hour > 12 && (todoItem.hour%12) <10 )
                          ? `0${(todoItem.hour%12).toString()}`
                          : `0${todoItem.hour.toString()}`
                      }:${
                        todoItem.minute < 10
                          ? `0${todoItem.minute.toString()}`
                          : todoItem.minute
                      } ${todoItem.hour > 12 ? `PM` : `AM`}] [${todoItem.day}-${
                        todoItem.month
                      }-${todoItem.year}]`}</p>
                <div className="buttons">
                  <Image
                    onClick={()=>handleArchive(slug)}
                    width={iconSize}
                    height={iconSize}
                    src="/svg/archive.svg"
                    alt="archive"
                  />
                  <Image
                  onClick={()=>handleDelete(slug)}
                    width={iconSize}
                    height={iconSize}
                    src="/svg/delete-alt.svg"
                    alt="delete"
                  />
                </div>
                <div className="percentage">
                  <p>{showPercentage()}</p>
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
                  autoComplete="off"
                  value={todoInputValue}
                  onChange={(e) => {
                    setTodoInputValue(e.target.value);
                  }}
                  onKeyDown={handleClick}
                />
                <Image
                  width={iconSize}
                  height={iconSize}
                  src="/svg/ui-add.svg"
                  alt="add"
                />
              </div>
              {/* Showing the checkList */}
              {todoItem.data.map((item, index) => {
                return (
                  <TodoCheckListItem
                    key={index}
                    content={item.content}
                    index={index}
                    done={item.done}
                    handleItemDelete={handleItemDelete}
                    handleCompleteItem={handleCompleteItem}
                    time={`${
                      item.hour > 12
                        ? (item.hour % 12).toString() : item.hour<10 ? `0${item.hour.toString()}` : item.hour === 0
                        ? 12 : item.hour
                    }:${item.minute<10 ? `0${item.minute.toString()}`:item.minute}:${item.second<10 ? `0${item.second.toString()}`:item.second} ${item.hour>12 ? `PM` : `AM`}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
