import { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/Input.jsx";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todayDate, setTodayDate] = useState(new Date().toISOString().split("T")[0]);
  const [startDate, setStartDate] = useState("13:00");
  const [endDate, setEndDate] = useState("14:00");
  const [category, setCategory] = useState("lecturer");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const formatTime = (time) => time.slice(0, 5);


  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/todos/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setTitle(data.title || "");
          setDescription(data.description || "");
          setTodayDate(data.today_date || "");
          setStartDate(formatTime(data.start_date) || "13:00");
          setEndDate(formatTime(data.end_date) || "14:00");
          setCategory(data.category || "lecturer");
          setTopic(data.topic || "");
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let todoData = {
      title,
      description,
      todayDate,
      startDate,
      endDate,
      category,
      topic,
    };

    // Determine endpoint and method based on whether we're creating or updating
    const endpoint = id ? `/todos/${id}` : "/todos";
    const method = id ? axiosClient.put : axiosClient.post;

    method(endpoint, todoData)
      .then(() => navigate("/science"))
      .catch((error) => console.error(id ? "Error updating todo" : "Error creating todo", error));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
            className="mt-1 block w-full"
          >
            <SelectTrigger>
              <span>{category || "---select---"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lecturer">Lecturer</SelectItem>
              <SelectItem value="public_holidays">Public Holidays</SelectItem>
              <SelectItem value="no_lecturer">No Lecturer</SelectItem>
              <SelectItem value="time_e">Time E</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {category === "lecturer" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <Select
              value={title}
              onValueChange={(value) => setTitle(value)}
              className="mt-1 block w-full"
            >
              <SelectTrigger>
                <span>{title || "---select---"}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="django">Django</SelectItem>
                <SelectItem value="numpy">Numpy</SelectItem>
                <SelectItem value="pandas">Pandas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Topic</label>
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
          />
        </div>

        {category === "lecturer"   && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <Input
                type="time"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <Input
                type="time"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        )}
        {category === "time_e"   && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <Input
                type="time"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <Input
                type="time"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Today Date</label>
          <Input
            type="date"
            value={todayDate}
            onChange={(e) => setTodayDate(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex space-x-4">
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {id ? "Update Todo" : "Create Todo"}
          </Button>
          <Button
            type="button"
            className="bg-gray-500 text-white hover:bg-gray-600"
            onClick={() => navigate("/science")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
  