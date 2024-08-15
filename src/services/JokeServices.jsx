// JokeServices.jsx
const API_URL = "http://localhost:8088/jokes"; // Note the endpoint is now `/jokes`

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


// Function to fetch jokes
export const fetchJokes = async () => {
  const response = await fetch('http://localhost:8088/jokes');
  return response.json();
};
