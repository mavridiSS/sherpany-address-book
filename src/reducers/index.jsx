const initialState = {
  settings: ["ch", "es", "fr", "gb"]
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: action.settings
      };
    default:
      return state;
  }
};
