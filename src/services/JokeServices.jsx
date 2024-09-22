// JokeServices.jsx
const API_URL = "http://localhost:8088/jokes"; // Note the endpoint is now `/jokes`
//---
// * Function to add joke
export const addJoke = async (text) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text, // The joke text
        told: false, // Initial state for "told"
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add joke");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};
//---
// * Function to update a joke
export const updateJoke = async (joke) => {
  try {
    const response = await fetch(`${API_URL}/${joke.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joke),
    });

    if (!response.ok) {
      throw new Error("Failed to update joke");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};
// ---
// * delete joke service call 
export const deleteJoke = async (jokeId) => {
  try {
    const response = await fetch(`${API_URL}/${jokeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete joke");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting joke:", error);
    throw error;
  }
};
// ---
// * Function to fetch jokes
export const fetchJokes = async () => {
  const response = await fetch('http://localhost:8088/jokes');
  return response.json();
};
