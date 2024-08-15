import "./App.css";
import { addJoke } from "./services/JokeServices";
import { useState } from "react";

export const App = () => {
  // State to hold the input value
  const [joke, setJoke] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

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
      const newJoke = await addJoke(joke);
      setAllJokes([...allJokes, newJoke]); // Add new joke to all jokes
      setUntoldJokes([...untoldJokes, newJoke]); // Add new joke to untold jokes
      setJoke(''); // Clear the input field after submission
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
      <div>
        <h2>All Jokes</h2>
        <ul>{allJokes.map(joke => <li key={joke.id}>{joke.text}</li>)}</ul>
        <h2>Untold Jokes</h2>
        <ul>{untoldJokes.map(joke => <li key={joke.id}>{joke.text}</li>)}</ul>
        <h2>Told Jokes</h2>
        <ul>{toldJokes.map(joke => <li key={joke.id}>{joke.text}</li>)}</ul>
      </div>
    </div>
  );
};
