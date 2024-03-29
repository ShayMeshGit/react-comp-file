jest.mock("../util/logger");
jest.mock("fs");

import { createCompJsFile } from "../functions/createCompJsFile";
import * as fs from "fs";
import * as path from "path";

describe("createCompJsFile", () => {
  const MOCK_FILE_INFO = {
    "/src/components/Test/": "",
  };

  test("Should create Test.js file in Test folder", () => {
    require("fs").__setMockFiles(MOCK_FILE_INFO);
    const folderPath = path.join(process.cwd(), "src", "components", "Test");
    fs.mkdirSync(folderPath);

    const filePath = path.join(
      process.cwd(),
      "src",
      "components",
      `Test`,
      "Test.js"
    );

    createCompJsFile("Test", false);

    const actual = fs.existsSync(filePath);
    expect(actual).toBeTruthy();

    fs.rmdirSync(path.join(process.cwd(), "src"), { recursive: true });
  });
});
