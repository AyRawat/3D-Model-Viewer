import { render, screen, fireEvent } from "@testing-library/react";
import FileComponent from "../src/components/FileComponent";

describe("FileComponent", () => {
  it("should render the component correctly", () => {
    const { getByText } = render(<FileComponent />);
    expect(getByText("Upload a file")).toBeInTheDocument();
  });

  it("should submit the form when the submit button is clicked", async () => {
    const { getByText, getByLabelText } = render(<FileComponent />);
    const file = new File(["test"], "test.png", { type: "image/png" });
    const descriptionInput = getByLabelText("Enter a description ...");
    const fileInput = getByLabelText("Choose an image file");
    const submitButton = getByText("Submit");

    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(submitButton);
  });
});
