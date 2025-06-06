import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("컴포넌트 렌더링 테스트", () => {
  it("메인 페이지의 문구가 제대로 표시되는가", () => {
    render(<Home />);
    const teamText = screen.getByText("TEAM HAGOJAEBI, DIGROUND!");
    expect(teamText).toBeInTheDocument();
  });
});
