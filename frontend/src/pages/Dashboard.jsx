import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import TaskCard from "../pages/Taskcard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskData, setEditTaskData] = useState({ _id: "", title: "" });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No user logged in");

      const token = await currentUser.getIdToken();

      const res = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const token = await auth.currentUser.getIdToken();

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (res.ok) {
        setNewTask("");
        fetchTasks();
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = await auth.currentUser.getIdToken();

      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCompleteTask = async (taskId, completed) => {
    try {
      const token = await auth.currentUser.getIdToken();

      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });

      if (res.ok) {
        fetchTasks();
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const token = await auth.currentUser.getIdToken();

      const res = await fetch(`/api/tasks/${editTaskData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTaskData.title }),
      });

      if (res.ok) {
        fetchTasks();
        setIsEditing(false);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {user && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.displayName}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Add New Task</h3>
          <form
            onSubmit={handleAddTask}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Task Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Your Tasks</h3>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet</p>
          ) : (
            <div>
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                  onEdit={(task) => {
                    setEditTaskData(task);
                    setIsEditing(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Task Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editTaskData.title}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, title: e.target.value })
              }
              className="w-full border px-4 py-2 mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
