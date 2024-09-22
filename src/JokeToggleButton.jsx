// JokeToggleButton.jsx
import PropTypes from 'prop-types';

export const JokeToggleButton = ({ joke, handleToggleTold, handleDeleteJoke }) => {
  return (
    <div>
      <button onClick={() => handleToggleTold(joke)} className="toggle-told-button">
        {joke.told ? "Unmark as Told" : "Mark as Told"}
      </button>
      <button onClick={() => handleDeleteJoke(joke.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

JokeToggleButton.propTypes = {
    joke: PropTypes.object.isRequired,
    handleToggleTold: PropTypes.func.isRequired,
    handleDeleteJoke: PropTypes.func.isRequired,
  };