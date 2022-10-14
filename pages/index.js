import Layout from "../components/Layout";
import MainTodoItem from "../components/MainPage/MainTodoItem";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const iconSize = 20;
  // ? Getting Input from the Create A Todo
  const [createTodoTitle,setCreateTodoTitle] = useState("")
  // ? Storing the Main Todo List in a State
  const [todosMain,setTodosMain] = useState()
  
  useEffect(() => {
    const getTodoMainList = async() =>{
      const todosList = localStorage.getItem('todosMain');
      if(todosList === null){
        localStorage.setItem('todosMain',JSON.stringify([]))
        setTodosMain(JSON.parse(localStorage.getItem('todosMain')))
      }
      else{
        setTodosMain(JSON.parse(localStorage.getItem('todosMain')))
      }
    }
    getTodoMainList()
  }, [])

  const handleClick = (e) => {
    if(e.key === "Enter"){
      if(createTodoTitle !== ""){
        setCreateTodoTitle("")
        const date = new Date()
        const inputValue = {
          title: createTodoTitle,
          day: date.getDate(),
          month: date.getMonth()+1,
          year: date.getFullYear(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          data:[]
        }
        const todoList = JSON.parse(localStorage.getItem('todosMain'));
        const gotoIndex = todoList.length;
        todoList.push(inputValue)
        localStorage.setItem('todosMain',JSON.stringify(todoList));
        router.push(`/todos/${gotoIndex}`)
      }
    }
  }

  return (
    <Layout>
      <div className="your-todos">
        <div className="header-text justpadding">
          <p>Your MonkDos</p>
        </div>
        <div className="createTodoInput">
          <input
            type="text"
            name="createtodo"
            id="createtodo"
            placeholder="Type new ToDo list name"
            value={createTodoTitle}
            onChange={(e)=>{setCreateTodoTitle(e.target.value)}}
            onKeyDown={handleClick}
            autoComplete="off"
          />
          <img src="/svg/ui-add.svg" width={iconSize} height={iconSize} alt="add"></img>
        </div>

        <div className="todoList">
          
          {/* {todoItems.map((item,index) => {
            return <MainTodoItem key={index} index={index} title={item} />
          })} */}
          
          {todosMain ? todosMain.map((todoItem,index) => {
            return <MainTodoItem key={index} index={index} title={todoItem.title} date={`${todoItem.day}-${todoItem.month}-${todoItem.year}`}/>
          }) : `Loading`}
        </div>

      </div>
    </Layout>
  );
}
