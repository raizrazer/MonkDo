import React from 'react'
import Layout from '../components/Layout'
import { useState,useEffect } from 'react';
import Image from 'next/image';

export default function Statistics() {
  const [todosMain,setTodosMain] = useState()
  const [totalDone, setTotalDone] = useState(0);

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

  const numberOfTodoList = () => {
    return todosMain.length
  };
  const totalnumberOfTodos = () => {
    const total = todosMain.forEach((item) => {
      console.log(item.data.length);
      return item.data.length;
    });
    console.log(total)
  };

  return (
    <Layout>
        Statistics
        Number of MonkDo Lists: {todosMain && numberOfTodoList()}
        <br></br>
        Number of MonkDos: {todosMain && totalnumberOfTodos()}
    </Layout>
  )
}
