import "./App.css";
import { addJoke } from "./services/JokeServices";
import { useState } from "react";

export const App = () => {
  // State to hold the input value
  const [joke, setJoke] = useState("");

  // Function to handle input change
  const handleChange = (event) => {
    console.log(joke);
    setJoke(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (joke.trim()) {
      // Ensure the joke is not just whitespace
      try {
        await addJoke(joke);
        setJoke(""); // Clear the input field after submission
        alert("Joke added successfully!");
      } catch (error) {
        alert("Failed to add joke.");
      }
    } else {
      alert("Please enter a joke.");
    }
  };

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New One Liner"
          value={joke}
          onChange={handleChange}
          className=""
        />
        <button type="submit">Add Joke</button>
      </form>
    </div>
  );
};
