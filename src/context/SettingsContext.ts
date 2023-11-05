import { createContext } from "react";
import { Action, Context } from "./OrderPlacementContext";

export const SettingsContext = createContext<Context>({});

type State = {
  updateCount: number;
};

export function settingsReducer(state: State, action: Action) {
  switch (action.type) {
    case "countUpdate":
      return { ...state, updateCount: state.updateCount + 1 };
    default:
      throw new Error();
  }
}
