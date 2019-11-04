import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { UsersTableWrapper } from "./UsersTableWrapper";
import { IDLE_TIME } from "../../constants";
import { mount } from "enzyme";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("fetching data if user is idle", async () => {
  jest.useFakeTimers();
  const fakeFetchData = jest.fn();
  const fetchData = jest.spyOn(UsersTableWrapper.prototype, "fetchData");
  fetchData.mockImplementation(fakeFetchData);

  await act(async () => {
    ReactDOM.render(<UsersTableWrapper />, container);
  });

  expect(fakeFetchData).toHaveBeenCalledTimes(1);
  window.dispatchEvent(new Event("mousemove"));
  jest.advanceTimersByTime(IDLE_TIME);
  expect(fakeFetchData).toHaveBeenCalledTimes(2);
  fetchData.mockRestore();
});

it("fetching data", async () => {
  const fakeResponse = {
    results: [
      {
        cell: "079 628 99 42",
        dob: { date: "1957-11-03T02:00:13.403Z", age: 62 },
        email: "andres.marchand@example.com",
        gender: "male",
        id: { name: "AVS", value: "756.1981.4798.17" },
        location: {
          street: { number: 4527, name: "Rue de L'Abbé-De-L'Épée" },
          city: "Erlach",
          state: "Obwalden",
          country: "Switzerland",
          postcode: 7389
        },
        login: {
          uuid: "19d7848d-fcdc-4cdb-ada2-23feb77ce3dc",
          username: "reddog219",
          password: "state",
          salt: "8XZWU2RA",
          md5: "b3ad9e8d4bee0340986e797ff9c29721"
        },
        name: { title: "Monsieur", first: "Andres", last: "Marchand" },
        nat: "CH",
        phone: "077 479 28 79",
        picture: {
          large: "https://randomuser.me/api/portraits/men/92.jpg",
          medium: "https://randomuser.me/api/portraits/med/men/92.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/men/92.jpg"
        },
        registered: { date: "2019-03-06T11:51:31.474Z", age: 0 }
      }
    ]
  };
  jest.spyOn(window, "fetch").mockImplementation(() => {
    const fetchResponse = {
      json: () => Promise.resolve(fakeResponse)
    };
    return Promise.resolve(fetchResponse);
  });

  let wrapper;
  await act(async () => {
    wrapper = mount(<UsersTableWrapper />);
  });
  expect(wrapper.state().data).toEqual(fakeResponse.results);
  window.fetch.mockRestore();
});
