import commander from "commander";
import fs from "fs";
import npm from "npm";
import util from "util";
import child from "child_process";
const exec = util.promisify(child.exec);

const { program } = commander;

program.version("0.1.0");

program.option("--next-auth", "Add next auth configuration");

const options = program.opts();

program
  .command("next-boilerplate-easy [name]")
  .description("create default template if not using flags")
  .action(async (appName) => {
    if (!appName || appName.trim() === ".") {
      fs.writeFileSync(
        `${__dirname}/file1.ts`,
        "console.log('This is file 1!')",
      );

      await exec("yarn add axios", {
        cwd: __dirname,
      });

      return;
    }

    fs.mkdirSync(`${__dirname}/${appName}`);
    await exec("yarn add axios", {
      cwd: `${__dirname}/${appName}`,
    });
    fs.writeFileSync(
      `${__dirname}/${appName}/file1.ts`,
      "console.log('This is file 1!')",
    );
  });

program.parse(process.argv);

// const options = program.opts();

// console.log("options: ", options);
