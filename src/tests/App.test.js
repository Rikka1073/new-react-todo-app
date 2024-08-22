import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/";
import App from "../App";

describe("学習内容登録のテスト", () => {
  test("新しい学習記録が追加され、合計時間が更新される", async () => {
    // Appコンポーネントをレンダリング
    await act(async () => {
      render(<App />);
    });

    // 初期状態での合計時間を取得
    const totalTime = screen.getByText(/合計時間/i).textContent;

    // 学習内容と時間を入力
    fireEvent.change(screen.getByLabelText(/学習内容/i), {
      target: { value: "テスト(削除予定)" },
    });
    fireEvent.change(screen.getByLabelText(/学習時間/i), {
      target: { value: "2" },
    });

    // 登録ボタンのクリック
    fireEvent.click(screen.getByText(/登録/i));

    await waitFor(() => {
      // 追加された学習記録が画面に表示されているかを確認
      const newRecord = screen.getByTestId("record-text-3");
      expect(newRecord).toBeVisible();

      // 更新後の合計時間を取得
      const updatedTotalTime = screen.getByText(/合計時間/i).textContent;
      // 合計時間が増えたことを確認
      expect(updatedTotalTime).not.toBe(totalTime);
    });
  });
});

describe("学習内容登録の削除テスト", () => {
  test("削除ボタンを押すと学習記録が削除される", async () => {
    // Appコンポーネントをレンダリング
    await act(async () => {
      render(<App />);
    });

    // 学習内容と時間を入力
    fireEvent.change(screen.getByLabelText(/学習内容/i), {
      target: { value: "削除テスト" },
    });
    fireEvent.change(screen.getByLabelText(/学習時間/i), {
      target: { value: "4" },
    });

    // 登録ボタンのクリック
    fireEvent.click(screen.getByTestId("add-button"));

    await waitFor(() => {
      // 登録されたかの確認
      expect(screen.getByTestId("record-box-3")).toBeVisible();
    });

    // 削除前のrecord-boxの数を取得
    const beforeRecordNumber = screen.getAllByTestId("record-box").length;

    // 削除ボタン取得
    const deleteButton = screen.getByTestId("delete-button-3");

    // 削除ボタンのクリック
    fireEvent.click(deleteButton);

    // 削除されているかを確認
    await waitFor(() => {
      const afterRecordNumber = screen.getAllByTestId("record-box").length;
      expect(afterRecordNumber).toBe(beforeRecordNumber);
    });
  });
});

describe("エラーが表示されるかのテスト", () => {
  test("入力をしないで登録を押すとエラーが表示される", async () => {
    // Appコンポーネントをレンダリング
    await act(async () => {
      render(<App />);
    });

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("入力されていない項目があります");
      expect(errorMessage).toBeVisible();
    });

    screen.debug();
  });
});
