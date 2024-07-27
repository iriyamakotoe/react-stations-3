import { render, screen } from '@testing-library/react';
import { expect, test, describe } from "vitest";
import { Home } from './Home'

describe('ログイン画面のレンダリング', () => {
  test('h1のタイトルを確認する', () => {
    render(<Home />);
    const target = screen.getByRole("heading", { level: 1 });
    expect(target).toHaveTextContent("ログイン");
  })

});