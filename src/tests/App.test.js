import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import App from "../App";

describe("Title Test", () => {
  test("タイトルが画面上に表示されていること", () => {
    render(<App />);
    const title = screen.getByTestId("main-title");
    expect(title).toHaveTextContent("学習記録一覧");
  });
});

describe("学習内容登録のテスト", () => {
  test("新しい学習記録が追加され、合計時間が更新される", () => {
    // Appコンポーネントをレンダリング
    render(<App />);

    // 初期状態での合計時間を取得
    const totalTime = screen.getByText(/合計時間/i).textContent;

    // 学習内容と時間を入力
    fireEvent.change(screen.getByLabelText(/学習内容/i), {
      target: { value: "テスト" },
    });
    fireEvent.change(screen.getByLabelText(/学習時間/i), {
      target: { value: "2" },
    });

    // 登録ボタンのクリック
    fireEvent.click(screen.getByText(/登録/i));

    // 更新後の合計時間を取得
    const updatedTotalTime = screen.getByText(/合計時間/i).textContent;

    // 合計時間が増えたことを確認
    expect(updatedTotalTime).not.toBe(totalTime);

    // 追加された学習記録が画面に表示されているかを確認
    expect(screen.getByText(/テスト 2時間/i)).toBeVisible();
  });
});

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

    waitFor(() => {
      // 削除内容取得
      const beforeDeleteText = screen.getByText(/削除テスト 4時間/i);

      // 削除内容が画面に表示されているかを確認
      expect(beforeDeleteText).toBeInTheDocument();
    });

    // 削除ボタンのクリック
    const button = screen.getByRole("button", { name: "削除" });
    fireEvent.click(button);

    // 学習記録を削除を確認
    waitFor(() => {
      const afterDeleteText = screen.getByText(/削除テスト 4時間/i);
      expect(afterDeleteText).not.toBeInTheDocument();
    });
  });
});
