import{ useContext } from "react";
import { OrderPlacement } from "../context/orderPlacement"; // Import with consistent naming

export const useOrderPlacement = () => {
  const context = useContext(OrderPlacement); // Use consistent naming

  if (!context) {
    throw Error("useOrderPlacement must be used inside an OrderPlacement provider");
  }

  return context;
};
