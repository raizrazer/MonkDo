import Layout from "../components/Layout";
import MainTodoItem from "../components/MainPage/MainTodoItem";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const iconSize = 20;
  // * Getting Input from the Create A Todo
  const [createTodoTitle,setCreateTodoTitle] = useState("")
  // * Storing the Main Todo List in a State
  const [todosMain,setTodosMain] = useState()

  //! Runs on the first time of load.
  useEffect(() => {
    const getTodoMainList = async() =>{
      const todosList = localStorage.getItem('todosMain');
      // * If the array in the local Storage is null then this handles it.
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
  //* HANDLES THE DELETE BUTTON FUNCTIONS OF THE MAIN TODO LIST ITEM
  const handleDelete = (index) =>{
    //* Delete Function
    const todosMainList = JSON.parse(localStorage.getItem('todosMain'));
    const filtered = todosMainList.filter((item,indexTodo) => indexTodo!=index)
    localStorage.setItem('todosMain',JSON.stringify(filtered));
    setTodosMain(filtered)
  }
  //* HANDLES THE ARCHIVE BUTTON FUNCTIONS OF THE MAIN TODO LIST ITEM
  const handleArchive = (index) => {
    console.log("Clicked",index)
  }

  //* HANDLES THE SUMBIT of CREATE A TODO
  const handleClick = (e) => {
    if(e.key === "Enter"){
      if(createTodoTitle !== ""){
        setCreateTodoTitle("")
        const date = new Date()
        // ? MAIN VALUE of the input creation
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
            return <MainTodoItem key={index} index={index} handleDelete={handleDelete} handleArchive={handleArchive} title={todoItem.title} date={`${todoItem.day}-${todoItem.month}-${todoItem.year}`}/>
          }) : `Loading`}
        </div>

      </div>
    </Layout>
  );
}
