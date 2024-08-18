import React from "react";
import { render, screen, fireEvent, waitFor, within, act } from "@testing-library/react";
import "@testing-library/jest-dom/";
import App from "../App";
import userEvent from "@testing-library/user-event";

// describe("学習内容登録のテスト", () => {
//   test("新しい学習記録が追加され、合計時間が更新される", async () => {
//     // Appコンポーネントをレンダリング
//     render(<App />);

//     // 初期状態での合計時間を取得
//     const totalTime = screen.getByText(/合計時間/i).textContent;

//     // 学習内容と時間を入力
//     fireEvent.change(screen.getByLabelText(/学習内容/i), {
//       target: { value: "テスト" },
//     });
//     fireEvent.change(screen.getByLabelText(/学習時間/i), {
//       target: { value: "2" },
//     });

//     // 登録ボタンのクリック
//     fireEvent.click(screen.getByText(/登録/i));

//     // 更新後の合計時間を取得
//     const updatedTotalTime = screen.getByText(/合計時間/i).textContent;

//     // 合計時間が増えたことを確認
//     expect(updatedTotalTime).not.toBe(totalTime);

//     // 追加された学習記録が画面に表示されているかを確認
//     expect(screen.getByText(/テスト 2時間/i)).toBeVisible();
//   });
// });

describe("学習内容登録の削除テスト", () => {
  test("削除ボタンを押すと学習記録が削除される", () => {
    // Appコンポーネントをレンダリング
    render(<App />);

    // 学習内容と時間を入力
    fireEvent.change(screen.getByLabelText(/学習内容/i), {
      target: { value: "削除テスト" },
    });
    fireEvent.change(screen.getByLabelText(/学習時間/i), {
      target: { value: "4" },
    });

    // 登録ボタンのクリック
    fireEvent.click(screen.getByText(/登録/i));

    // 登録されたかの確認
    expect(screen.getByTestId("recods-0")).toBeVisible();

    const beforeDleteRecord = screen.getByTestId("recods-0");

    // 削除ボタン取得
    const deleteButton = screen.getByTestId("delete-button-0");

    // 削除ボタンのクリック
    fireEvent.click(deleteButton);
  });
});
