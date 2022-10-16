import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

export default function Statistics() {
  const [todosMain, setTodosMain] = useState();
  const [archivedMain, setArchivedMain] = useState();
  const [totalDone, setTotalDone] = useState(0);
  const ref = useRef(null);

  const ctx = ref.current;

  //! Runs on the first time of load.
  useEffect(() => {
    const getTodoMainList = async () => {
      const todosList = localStorage.getItem("todosMain");
      // * If the array in the local Storage is null then this handles it.
      if (todosList === null) {
        localStorage.setItem("todosMain", JSON.stringify([]));
        setTodosMain(JSON.parse(localStorage.getItem("todosMain")));
      } else {
        setTodosMain(JSON.parse(localStorage.getItem("todosMain")));
      }
    };
    const getArchivedList = async () => {
      const archivedList = localStorage.getItem("archivedList");
      // * If the array in the local Storage is null then this handles it.
      if (archivedList === null) {
        localStorage.setItem("archivedList", JSON.stringify([]));
        setArchivedMain(JSON.parse(localStorage.getItem("archivedList")));
      } else {
        setArchivedMain(JSON.parse(localStorage.getItem("archivedList")));
      }
    };
    getTodoMainList();
    getArchivedList();
  }, []);

  const numberOfTodoList = () => {
    return todosMain.length;
  };
  const numberOfArchivedList = () => {
    return archivedMain.length;
  };
  const ratioArchivevsMain = () => {
    const ratio = todosMain.length / archivedMain.length;
    return ratio;
  };
  const totalnumberOfTodos = () => {
    const total = todosMain.length;
    console.log(total);
  };

  if (ctx) {
    const monkDovsArchiveChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["MonkDos", "Archived"],
        datasets: [
          {
            label: "MonkDos vs Archived",
            data: [numberOfTodoList(), numberOfArchivedList()],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="w-[300px]">
          <canvas id="myChart" ref={ref} width="100" height="100">
            Canvas Element is not available
          </canvas>
        </div>
      </div>
      Statistics
      <br></br>
      Number of Archived MonkDo Lists: {todosMain && numberOfArchivedList()}
      <br></br>
      Number of MonkDo Lists: {todosMain && numberOfTodoList()}
      <br></br>
      Ratio of MonkDo/Archived: {todosMain && ratioArchivevsMain()}
      <br></br>
      Number of MonkDos: {todosMain && totalnumberOfTodos()}
    </Layout>
  );
}
