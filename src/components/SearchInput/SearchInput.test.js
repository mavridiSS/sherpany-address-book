import React from "react";
import SearchInput from "./SearchInput";
import { render, fireEvent, getByTestId } from "@testing-library/react";

it("clicks search button", () => {
  const onSearch = jest.fn();
  const { container } = render(<SearchInput onSearch={onSearch} />);
  const button = getByTestId(container, "search-button");
  fireEvent.click(button);
  expect(onSearch).toHaveBeenCalledTimes(1);
});

it("input value is changed", () => {
  const onSearch = jest.fn();
  const { container } = render(<SearchInput onSearch={onSearch} />);
  const inputName = getByTestId(container, "search-input");
  fireEvent.change(inputName, { target: { value: "bob obrien" } });
  expect(inputName.value).toBe("bob obrien");
});
