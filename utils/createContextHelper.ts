import React from "react";

export const createContextHelper = <T>(displayName: string) => {
  const context = React.createContext<T>({} as T);
  context.displayName = displayName;

  return context;
};

export const useContextHelper = <T>(
  context: React.Context<T>,
  defaultValue?: never,
) => {
  const value = React.useContext<T>(context);

  if (value === defaultValue) {
    throw new Error(`${context.displayName} is not available`);
  }

  return value;
};
