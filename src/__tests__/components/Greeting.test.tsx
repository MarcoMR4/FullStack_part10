import { render } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";

const Greeting = ({ name }: { name: string }) => {
  return (
    <View>
      {/* This node is tagged with the testID prop */}
      <Text testID="greetingText">Hello {name}!</Text>
    </View>
  );
};

describe("Greeting", () => {
  it("renders a greeting message based on the name prop", () => {
    const { debug, getByTestId } = render(<Greeting name="Kalle" />);

    debug();

    expect(getByTestId("greetingText")).toHaveTextContent("Hello Kalle!");
  });
});
