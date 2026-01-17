import { ThemeProviderCustom } from "@/src/context/ThemeContext";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import SignInContainer from "../../components/SignInContainer";

describe("SignInContainer", () => {
  it("calls onSubmit with correct values when form is submitted", async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProviderCustom>
        <SignInContainer onSubmit={onSubmit} />
      </ThemeProviderCustom>
    );

    await waitFor(() => {
      fireEvent.changeText(getByTestId("usernameField"), "kalle");
      fireEvent.changeText(getByTestId("passwordField"), "password");
      fireEvent.press(getByTestId("submitButton"));
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: "kalle",
      password: "password",
    });
  });
});
