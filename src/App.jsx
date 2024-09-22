import "./App.css";
import { JokeToggleButton } from "./JokeToggleButton";
import { addJoke, deleteJoke, fetchJokes, updateJoke } from "./services/JokeServices";
import { useEffect, useState } from "react";

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
      setJoke(""); // Clear the input field after submission
    }
  };

  const handleDeleteJoke = async (jokeId) => {
    try {
      await deleteJoke(jokeId);

      // Update local state
      const updatedAllJokes = allJokes.filter((j) => j.id !== jokeId);
      const updatedUntoldJokes = untoldJokes.filter((j) => j.id !== jokeId);
      const updatedToldJokes = toldJokes.filter((j) => j.id !== jokeId);

      setAllJokes(updatedAllJokes);
      setUntoldJokes(updatedUntoldJokes);
      setToldJokes(updatedToldJokes);
    } catch (error) {
      console.error("Error deleting joke:", error);
    }
  };

  // Function to handle toggling the "told" state of a joke
  const handleToggleTold = async (joke) => {
    try {
      const editedJoke = { ...joke, told: !joke.told };
      const updatedJoke = await updateJoke(editedJoke);

      // Update local state
      const updatedAllJokes = allJokes.map((j) =>
        j.id === updatedJoke.id ? updatedJoke : j
      );
      const updatedUntoldJokes = updatedJoke.told
        ? untoldJokes.filter((j) => j.id !== updatedJoke.id)
        : [...untoldJokes, updatedJoke]; // This line might be causing the issue
      const updatedToldJokes = updatedJoke.told
        ? [...toldJokes, updatedJoke]
        : toldJokes.filter((j) => j.id !== updatedJoke.id);

      setAllJokes(updatedAllJokes);
      setUntoldJokes(updatedUntoldJokes);
      setToldJokes(updatedToldJokes);
    } catch (error) {
      console.error("Error toggling told state:", error);
    }
  };

  // Fetch existing jokes on component mount
  useEffect(() => {
    const initializeJokes = async () => {
      const existingJokes = await fetchJokes();
      setAllJokes(existingJokes);
      setUntoldJokes(existingJokes);
    };
    initializeJokes();
  }, []);

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist!</h1>
      </div>

      {/* Joke Form */}
      <div className="joke-add-form">
        <input
          type="text"
          placeholder="New One Liner"
          value={joke}
          onChange={handleChange}
          className="joke-input"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="joke-input-submit"
        >
          Add Joke
        </button>
      </div>

      {/* Joke Lists */}
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold Jokes
            <span className="untold-count">{untoldJokes.length}</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <JokeToggleButton
                  joke={joke}
                  handleToggleTold={handleToggleTold}
                  handleDeleteJoke={handleDeleteJoke}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="joke-list-container">
          <h2>
            Told Jokes
            <span className="told-count">{toldJokes.length}</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <JokeToggleButton
                  joke={joke}
                  handleToggleTold={handleToggleTold}
                  handleDeleteJoke={handleDeleteJoke}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="joke-list-container">
          <h2>All Jokes</h2>
          <ul>
            {allJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                {/* Action buttons will go here */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
