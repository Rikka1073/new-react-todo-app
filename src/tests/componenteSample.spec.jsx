import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Title Test", () => {
  test("タイトルが画面上に表示されていること", () => {
    // testId(title)を指定して取得
    render(<App />);
    const title = screen.getByTestId("main-title");
    expect(title).toHaveTextContent("学習記録一覧");
  });
});
