import chalk from "chalk";
import * as fs from "fs";
import inquirer from "inquirer";
import writeConfig from "../utils/writeConfig.js";
import { Config } from "../types/config.types.js";
import checkInitialization from "../utils/checkInitialization.js";
import packageJson from "../../package.json";
import exitProcess from "../utils/exitProcess.js";
/**../utils/exit.js
 * Initializes the project with the provided configuration.
 * @param args - The command line arguments passed to the script.
 */
export default async function init(...args: any) {
  /**
   * Get the arguments passed to the script from the command line.
   */
  const arg = args[0];

  const DEFAULT_CONFIG: Config = {
    language: arg?.typescript ? "ts" : "js",
    path: arg?.path || "src/utils",
    separate: arg?.separate || false,
    v: packageJson.version,
  };

  /**
   * Check if the project is already initialized, if yes, then exit the process.
   * If the user has provided the --force flag, then force initialize the project.
   * If the user has not provided the --force flag, then exit the process.
   */
  if (!arg.force) {
    if (checkInitialization().isInitialized) {
      console.log(chalk.red("\n!! WARNING !!"));
      console.log("Project is already initialized 🚫");
      console.log(
        "If you want to reinitialize the project, use --force or -f flag"
      );
      exitProcess(1);
    }
  }

  /**
   * If the user has not provided any language flag, then detect the language of the project.
   * If the user has provided the language flag, then use the provided language.
   */
  if (!arg?.javascript && !arg?.typescript) {
    /**
     * Get the current working directory of the project.
     */
    const path = process.cwd();
    let packageJson = undefined;
    try {
      /**
       * Read the package.json file of the project.
       * If the package.json file does not exist, then exit the process.
       */
      packageJson = fs.readFileSync(`${path}/package.json`, "utf-8");
    } catch (e) {
      /**
       * todo if the package.json file does not exist, search in parent folders, give priority to the nearest package.json file in the parent folder and do the operation there
       */
      if (!packageJson) {
        console.log(chalk.red("No package.json file found 💀"));
        console.log(
          chalk.dim(
            "Please run the command in the root of the project or initialize the project before running the command\n"
          )
        );
        console.log(
          chalk.dim(
            "To initialize the project you need a package.json file, otherwise, you can just copy and paste methods in the utils folder"
          )
        );
        exitProcess(1);
      }
    }

    /**
     * Parse the package.json file to a JSON object.
     * If the package.json file is invalid, then exit the process.
     */
    let packageJsonObj = undefined;
    try {
      packageJsonObj = JSON.parse(packageJson);
    } catch (e) {
      console.log(chalk.red("\nInvalid package.json file 💀"));
      console.log(
        chalk.dim(
          "Please make sure that the package.json file is a valid JSON file\n"
        )
      );
      exitProcess(1);
    }

    /**
     * Check if the project is a typescript project or a javascript project.
     * If the project is a typescript project, then set the typescript flag to true or set the javascript flag to true.
     */
    if (
      packageJsonObj?.devDependencies?.typescript ||
      packageJsonObj?.dependencies?.typescript
    ) {
      DEFAULT_CONFIG.language = "ts";
    } else {
      DEFAULT_CONFIG.language = "js";
    }
    /**
     *  Configure the project with the detected language with user using inquirer
     */
    const ans = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: "Confirm the language for the project: ",
        choices: [
          { name: "Typescript", value: "ts" },
          { name: "Javascript", value: "js" },
        ],
        default: DEFAULT_CONFIG.language,
      },
    ]);
    DEFAULT_CONFIG.language = ans.language;
  }

  /**
   * If the user has not provided the path flag, ask the user for the path.
   */
  if (!arg.path) {
    const ans = await inquirer.prompt([
      {
        type: "input",
        name: "path",
        message: "Enter the path to store the utility methods: ",
        default: DEFAULT_CONFIG.path,
      },
    ]);

    DEFAULT_CONFIG.path = ans.path;
  }

  /**
   * If the user has not provided the separate flag, ask the user for the separate flag.
   */
  if (!arg.separate) {
    const ans = await inquirer.prompt([
      {
        type: "confirm",
        name: "separate",
        message: "Do you want to store the configuration in a separate file? ",
        default: DEFAULT_CONFIG.separate,
      },
    ]);

    DEFAULT_CONFIG.separate = ans.separate;
  }

  /**
   * Initialize the project with the provided configuration.
   */
  console.log(
    chalk.green("\nInitializing the project with the following config: 👇\n")
  );
  writeConfig(DEFAULT_CONFIG);
  console.log(chalk.dim(JSON.stringify(DEFAULT_CONFIG, null, 2)));
  console.log(chalk.green("\nProject initialized successfully ⭐"));
  console.log("Enjoy using lazykit 🚀\n");
  console.log(chalk.dim(packageJson.name + " v" + packageJson.version));

  exitProcess(0);
}
