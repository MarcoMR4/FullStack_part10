import formatDate from "@/src/utils/dateFormats";

describe("formatDate", () => {
  it("formats date correctly for 2023-08-15", () => {
    expect(formatDate("2023-08-15")).toBe("15.08.2023");
  });

  it("formats current date correctly", () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const expected = `${day}.${month}.${year}`;
    expect(formatDate(now.toISOString())).toBe(expected);
  });
});
