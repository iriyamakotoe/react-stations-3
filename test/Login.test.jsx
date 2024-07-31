import React from "react";
import { render, screen } from "@testing-library/react"
import { expect, test, describe } from "vitest"
import { SignIn } from "../src/pages/SignIn"

describe("ログイン画面のレンダリング", () => {
  test("ログイン画面のレンダリング", () => {
    render(<SignIn />);

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
