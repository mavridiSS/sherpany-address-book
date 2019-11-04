import { render, fireEvent, getByTestId } from "@testing-library/react";
import React from "react";
import Settings from "./Settings";
import { BrowserRouter as Router } from "react-router-dom";

it("populates select value", () => {
  const updateSettings = jest.fn();
  const fakeSettings = ["ch, gb"];
  const { container } = render(
    <Router>
      <Settings updateSettings={updateSettings} settings={fakeSettings} />
    </Router>
  );
  const select = getByTestId(container, "nationalities-select");
  // fireEvent.click(button);
  expect(select.value).toBe(["ch, gb"].toString());
});

it("updates settings", () => {
  const updateSettings = jest.fn();
  const fakeSettings = ["ch, gb"];
  const { container } = render(
    <Router>
      <Settings updateSettings={updateSettings} settings={fakeSettings} />
    </Router>
  );
  const select = getByTestId(container, "nationalities-select");
  expect(select.value).toBe(fakeSettings.toString());
  fireEvent.change(select, { target: { value: ["us"] } });
  expect(select.value).toBe(["us"].toString());
});
