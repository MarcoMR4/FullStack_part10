import { fireEvent, render } from "@testing-library/react-native";
import React, { useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

const Form = ({
  onSubmit,
}: {
  onSubmit: (data: { username: string; password: string }) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  return (
    <View>
      <View>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
          testID="usernameField"
        />
      </View>
      <View>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          testID="passwordField"
        />
      </View>
      <View>
        <TouchableWithoutFeedback onPress={handleSubmit} testID="submitButton">
          <Text>Submit</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

describe("Form", () => {
  it("calls function provided by onSubmit prop after pressing the submit button", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Form onSubmit={onSubmit} />);

    fireEvent.changeText(getByTestId("usernameField"), "kalle");
    fireEvent.changeText(getByTestId("passwordField"), "password");
    fireEvent.press(getByTestId("submitButton"));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    // onSubmit.mock.calls[0][0] contains the first argument of the first call
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: "kalle",
      password: "password",
    });
  });
});
