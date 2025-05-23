module.exports = {
  NOT_FOUND: (id) => `Object with id: ${id} not found`,
  VALIDATION_ERROR: "Validation error",
  CREATE_SUCCESS: "Successfully created object",
  CREATE_ERROR: "Error creating object",
  RETRIEVE_SUCCESS: "Successfully retrieved object(s)",
  RETRIEVE_ERROR: "Error retrieving object(s)",
  UPDATE_SUCCESS: "Successfully updated object",
  UPDATE_ERROR: (id) => `Error updating object with id: ${id}`,
  DELETE_SUCCESS: "Successfully deleted object",
  DELETE_ERROR: (id) => `Error deleting object with id: ${id}`,
};
