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

  useEffect(() => {
    const getTodoItemData = async () => {
      const todoList = await JSON.parse(localStorage.getItem("todosMain"));
      const todoItem = todoList[slug];
      setTodoItem(todoItem);
    };
    getTodoItemData();
  }, [slug]);

  //* HANDLES THE SUMBIT of CREATE A TODO
  const handleClick = (e) => {
    if (e.key === "Enter") {
      if (todoInputValue !== "") {
        setTodoInputValue("");
        const date = new Date();
        // ? MAIN VALUE of the input creation
        const todoInputValue = {
          content: todoInputValue,
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          data: [],
        };
        const todoList = JSON.parse(localStorage.getItem("todosMain"));
        const gotoIndex = todoList.length;
        todoList.push(todoInputValue);
        localStorage.setItem("todosMain", JSON.stringify(todoList));
        router.push(`/todos/${gotoIndex}`);
      }
    }
  };
  return (
    <Layout>
      {todoItem && (
        <div className="todoCheckListMain">
          <div className="todoMainEnter">
            <div className="todoMainEnter_Top">
              <div className="title">
                <p>
                  {todoItem
                    ? `${todoItem.title}  [${
                        todoItem.hour > 12 ? todoItem.hour % 12 : todoItem.hour
                      }:${
                        todoItem.minute < 10
                          ? "0" + todoItem.minute.toString()
                          : todoItem.minute
                      } ${todoItem.hour > 12 ? `PM` : `AM`}] [${todoItem.day}-${
                        todoItem.month
                      }-${todoItem.year}]`
                    : `Loading`}
                </p>
              </div>
              <div className="rightside">
                <div className="buttons">
                  <Image
                    width={iconSize}
                    height={iconSize}
                    src="/svg/archive.svg"
                    alt="archive"
                  />
                  <Image
                    width={iconSize}
                    height={iconSize}
                    src="/svg/delete-alt.svg"
                    alt="delete"
                  />
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
                  value={todoInputValue}
                  onChange={(e) => {
                    setTodoInputValue(e.target.value);
                  }}
                  onKeyDown={() => handleClick()}
                />
                <Image
                  width={iconSize}
                  height={iconSize}
                  src="/svg/ui-add.svg"
                  alt="add"
                />
              </div>

              <TodoCheckListItem content={"LMAO WHAT THE FUCK"} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
