import { createContext } from "react";

type action = {
  type: string;
  payload?: any;
};

type State = {
  currentPortfolio: string;
};

type Context = {
  state?: State;
  dispatch?: React.Dispatch<action>;
};

export const OrderPlacementContext = createContext<Context>({});

export function orderPlacementReducer(state: State, action: action) {
  switch (action.type) {
    case "selectPortfolio":
      return { ...state, currentPortfolio: action.payload };
    default:
      throw new Error();
  }
}
