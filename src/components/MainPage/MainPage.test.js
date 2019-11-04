import React from "react";
import MainPage from "./MainPage";
import SearchInput from "../SearchInput";
import UsersTableWrapper from "../UsersTable";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";

it("capturing snapshot of MainPage", () => {
  const wrapper = shallow(<MainPage />);
  expect(wrapper.find(SearchInput)).toHaveLength(1);
  expect(wrapper.find(UsersTableWrapper)).toHaveLength(1);
});
