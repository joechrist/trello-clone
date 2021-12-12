import { AppState } from "./state/appStateReducer";

/**
 * @ Function that makes a POST request and
 * @ Sends a JSON representation of our application state to the backend.
 * @ It will accept the current state and send it to the backend as JSON.
 * @ In case of an unsuccessful save we’ll throw an error.
 */
export const save = async (payload: AppState) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/save`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error while saving the state.");
  }
};

/**
 * @ Load data
 *@ Function that makes a GET request to retrieve the previously saved state
 */
export const load = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/load`
  );
  if (response.ok) {
    return response.json() as Promise<AppState>;
  } else {
    throw new Error("Error while loading the state.");
  }
};
