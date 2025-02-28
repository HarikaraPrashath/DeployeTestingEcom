import { createContext, useReducer } from "react";

// Context
export const OrderPlacement = createContext(); // Renamed for clarity

// Reducer
export const orderPlacementReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDER":
      return {
        ...state, // Spread the existing state to avoid overwriting other keys
        orderPlacement: action.payload, // Ensure consistent state property naming
      };

    case "CREATE_ORDER":
      return {
        ...state,
        orderPlacement: [action.payload, ...(state.orderPlacement || [])], // Handle null initial state
      };

    case "DELETE_ORDER": // Renamed from CREATE_ORDER to DELETE_ORDER
      return {
        ...state,
        orderPlacement: state.orderPlacement.filter((w) => w._id !== action.payload._id),
      };

    default:
      return state;
  }
};

// Context Provider
export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderPlacementReducer, {
    orderPlacement: null, // Ensure consistent naming
  });

  return (
    <OrderPlacement.Provider value={{ ...state, dispatch }}>
      {children}
    </OrderPlacement.Provider>
  );
};
