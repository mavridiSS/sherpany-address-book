import React from "react";
import { createMockStore } from "redux-test-utils";
import SettingsContainer from "./SettingsContainer";
import { updateSettings } from "../../actions";
import { shallow } from "enzyme";

it("dispatches updateSettings action", () => {
  const mockState = {
    settings: ["ch", "es", "fr", "gb"]
  };
  const store = createMockStore(mockState);
  const wrapper = shallow(<SettingsContainer store={store} />);
  store.dispatch(
    wrapper
      .dive()
      .props()
      .updateSettings()
  );
  expect(store.isActionDispatched(updateSettings())).toEqual(true);
});

it("check state", () => {
  const mockState = {
    settings: ["ch", "es", "fr", "gb"]
  };
  const store = createMockStore(mockState);
  const wrapper = shallow(<SettingsContainer store={store} />);
  store.dispatch(
    wrapper
      .dive()
      .props()
      .updateSettings(mockState.settings)
  );
  expect(store.getState()).toEqual(mockState);
});
