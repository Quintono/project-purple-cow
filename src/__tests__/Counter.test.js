import React from "react";

// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import react-testing methods
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

import Counter from "../Components/Counter";

const server = setupServer(
  rest.get(
    "https://api.countapi.xyz/hit/q-purple-cow/1ccb732e-b55a-4404-ad3f-0f99c02fe44e",
    (req, res, ctx) => {
      return res(ctx.json({ value: 2 }));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("calls count api and renders count", async () => {
  render(<Counter />);

  fireEvent.click(screen.getByText("Count Purple Cows"));

  expect(screen.getByTestId("loading-element")).toBeTruthy();

  await waitFor(() => screen.getByTestId("count-element"));

  expect(screen.getByTestId("count-element")).toHaveTextContent(2);
});
