import Layout from "../components/Layout";
import MainTodoItem from "../components/MainPage/MainTodoItem";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const iconSize = 20;
  // * Getting Input from the Create A Todo
  const [createTodoTitle,setCreateTodoTitle] = useState("");
  // * Storing the Main Todo List in a State
  const [todosMain,setTodosMain] = useState();
  const [emptyScreenText,setEmptyScreenText] = useState();

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
    if(confirm(`Are you sure you want delete!`)){
      const todosMainList = JSON.parse(localStorage.getItem('todosMain'));
      const filtered = todosMainList.filter((item,indexTodo) => indexTodo!=index)
      localStorage.setItem('todosMain',JSON.stringify(filtered));
      setTodosMain(filtered)
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
    setTodosMain(filtered)
  }

  //* HANDLES THE SUMBIT of CREATE A TODO
  const handleClick = (e) => {
    if(e.key === "Enter" || e.target.alt === "add"){
      if(createTodoTitle !== ""){
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
        setCreateTodoTitle("")
        router.push(`/todos/${gotoIndex}`)
      }
    }
  }

  //* Show a random Text when the whole thing is empty
  const showRandomText = () => {
    const arrayOfHappyText = [
      `Looks like you're all done for now 😊`,
      `Ohh it looks empty here 🤔, Make a todo`,
      `Are you sure, you're all done 😅`,
      `Good job, you have no more MonkDos 🚀`,
      `Statistics is where you can see how you're doing 👨‍💻`,
    ]
    const randomValue = Math.floor(Math.random()*arrayOfHappyText.length);
    return arrayOfHappyText[randomValue];
  }

  useEffect(()=>{
    setEmptyScreenText(showRandomText());
  },[])

  return (
    <Layout>
      <div className="your-todos">
        <div className="header-text justpadding">
          <p>{todosMain && (todosMain.length <= 1) ? `Your MonkDo` : `Your MonkDos`}</p>
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
          <img onClick={handleClick} src="/svg/ui-add.svg" width={iconSize} height={iconSize} alt="add"></img>
        </div>

        <div className="todoList">
          
          {/* {todoItems.map((item,index) => {
            return <MainTodoItem key={index} index={index} title={item} />
          })} */}
          
          {todosMain ? todosMain.map((todoItem,index) => {
            return <MainTodoItem key={index} index={index} handleDelete={handleDelete} handleArchive={handleArchive} title={todoItem.title} date={`[${
              (todoItem.hour > 12 && (todoItem.hour%12) <10 )
                ? `0${(todoItem.hour%12).toString()}`
                : `0${todoItem.hour.toString()}`
            }:${
              todoItem.minute < 10
                ? `0${todoItem.minute.toString()}`
                : todoItem.minute
            } ${todoItem.hour > 12 ? `PM` : `AM`}] [${todoItem.day}-${todoItem.month}-${todoItem.year}]`}/>
          }) : `Loading`}
        </div>
          {todosMain && todosMain.length ===0 ? 
          <div className="text-xl text-center px-10 md:px-5">
            {emptyScreenText}
          </div>
          : ``}
      </div>
    </Layout>
  );
}
