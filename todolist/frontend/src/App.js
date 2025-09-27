import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import axios from "axios";

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [userId, setUserId] = useState("");

  const showTodos = async () => {
    try {
      const { data } = await axios.get("/api/show/todos");
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addtodo = async (e) => {
    e.preventDefault();
    try {
      const add = await axios.post("/api/create/list", { task });
      if (add.status === 200) {
        setTask("");
        showTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todoDelete = await axios.delete(`/api/delete/todo/${id}`);
      if (todoDelete.status === 200) {
        showTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showSingleTodo = async (id) => {
    setEditMode(true);
    try {
      const { data } = await axios.get(`/api/todo/${id}`);
      setTask(data.task);
      setUserId(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (e) => {
    e.preventDefault();
    try {
      const edit = await axios.put(`/api/update/todo/${userId}`, { task });
      if (edit.status === 200) {
        setEditMode(false);
        setTask("");
        showTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showTodos();
  }, []);

  return (
    <>
      <Header />
      <div className="container App">
        <div className="form TodoWrapper" style={{ marginTop: "0" }}>
          <form onSubmit={editMode ? editTodo : addtodo}>
            <div
              className="form-wrapper"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ flex: 1 }}>
                <input
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                  className="todo-input"
                  type="text"
                  placeholder="Wprowadź zadanie..."
                  name="task"
                />
              </div>
              <button type="submit" className="todo-btn">
                {editMode ? "Edit" : "Dodaj"}
              </button>
            </div>
          </form>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Zadania</th>
              <th scope="col">Edycja</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((d) => (
                <tr key={d.id} className="Todo">
                  <th scope="row">{d.id}</th>
                  <td>{d.task}</td>
                  <td>
                    <i
                      onClick={() => showSingleTodo(d.id)}
                      className="fa-solid fa-pen-to-square edit-icon"
                    ></i>
                    <i
                      onClick={() => deleteTodo(d.id)}
                      className="fa-solid fa-trash-can delete-icon"
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
