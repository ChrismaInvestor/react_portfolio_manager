import { createContext } from "react";

export type Action = {
  type: string;
  payload?: any;
};

export type Context = {
  state?: any;
  dispatch?: React.Dispatch<Action>;
};

type State = {
  currentPortfolio: string;
};

export const OrderPlacementContext = createContext<Context>({});

export function orderPlacementReducer(state: State, action: Action) {
  switch (action.type) {
    case "selectPortfolio":
      return { ...state, currentPortfolio: action.payload };
    default:
      throw new Error();
  }
}
