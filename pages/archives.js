import React, { useState } from 'react'
import Layout from '../components/Layout'
import ArchivedItem from '../components/ArchivedItem';
import { useEffect } from 'react';

export default function Archives() {
  const iconSize = 25;
  const [archivedMain,setArchivedMain] = useState('')

  //! Runs on the first time of load.
  useEffect(() => {
    const getArchivedList = async() =>{
      const archivedList = localStorage.getItem('archivedList');
      // * If the array in the local Storage is null then this handles it.
      if(archivedList === null){
        localStorage.setItem('archivedList',JSON.stringify([]))
        setArchivedMain(JSON.parse(localStorage.getItem('archivedList')))
      }
      else{
        setArchivedMain(JSON.parse(localStorage.getItem('archivedList')))
      }
    }
    getArchivedList()
  }, [])

  //* HANDLES THE DELETE BUTTON FUNCTIONS OF THE MAIN TODO LIST ITEM
  const handleDelete = (index) =>{
    //* Delete Function
    if(confirm(`Are you sure you want delete from Archived !`)){
      const archivedList = JSON.parse(localStorage.getItem('archivedList'));
      const filtered = archivedList.filter((item,indexTodo) => indexTodo!=index)
      localStorage.setItem('archivedList',JSON.stringify(filtered));
      setArchivedMain(filtered)
    }
  }
  //* HANDLES THE UNARCHIVE BUTTON FUNCTIONS OF THE MAIN TODO LIST ITEM
  const handleUnarchive = (index) => {
    const archivedList = JSON.parse(localStorage.getItem('archivedList'));
    //* Get the unarchive Item.
    const unarchiveItem = archivedList[index];
    //* Add it to the archive List, If the archive exist just push else, create one and push.
    if(JSON.parse(localStorage.getItem('todosMain'))){
      const todosMainList = JSON.parse(localStorage.getItem('todosMain'));
      todosMainList.push(unarchiveItem);
      localStorage.setItem('todosMain',JSON.stringify(todosMainList));
    }
    else{
      localStorage.setItem('todosMain',JSON.stringify([]));
      const todosMain = JSON.parse(localStorage.getItem('todosMain'));
      todosMain.push(unarchiveItem);
      localStorage.setItem('todosMain',JSON.stringify(todosMain));
    }
    //* Delete it from the main list
    const filtered = archivedList.filter((item,indexTodo) => indexTodo!=index)
    localStorage.setItem('archivedList',JSON.stringify(filtered));
    setArchivedMain(filtered);
  }
  
  return (
    <Layout>
        <div className="archive-todos">
            <div className="header-text justpadding">
              <p>Archives</p>
            </div>
            <div className="archivetodoList">
              {archivedMain ? archivedMain.map((todoItem,index) => {
            return <ArchivedItem key={index} index={index} title={todoItem.title} handleDelete={handleDelete} handleUnarchive={handleUnarchive} date={`[${
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
            {archivedMain && (archivedMain.length === 0) ? <div className="text-xl text-center italic">
              <p>Nothing Archived Yet!</p>
            </div> : ``}
          </div>
    </Layout>
  )
}
