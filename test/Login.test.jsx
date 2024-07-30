import React from "react";
import { render, screen } from "@testing-library/react"
import { expect, test, describe } from "vitest"
import { Login } from "../src/pages/Login"

describe("ログイン画面のレンダリング", () => {
  test("ログイン画面のレンダリング", () => {
    render(<Login />);

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent("ログイン");

    const emailInput = screen.getByLabelText("email");
    expect(emailInput).toHaveTextContent("メールアドレス");

    const passwordInput = screen.getByLabelText("password");
    expect(passwordInput).toHaveTextContent("パスワード");

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("ログイン");
  });
});
