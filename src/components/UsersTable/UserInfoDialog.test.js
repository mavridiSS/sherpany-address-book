import { render, fireEvent, getByTestId } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import UserInfoDialog from "./UserInfoDialog";
import { mount } from "enzyme";

it("open dialog", async () => {
  let wrapper;
  act(() => {
    wrapper = mount(<UserInfoDialog data={{}} />);
  });
  act(() => {
    wrapper.find("button").simulate("click");
  });
  expect(document.querySelector("#form-dialog-title")).not.toEqual(null);
});
