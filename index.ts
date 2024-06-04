#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blue("\n\t\t", "+".repeat(60)));
console.log(
  "\t\t",
  chalk.black.bgGray(
    "\t>>>>>>>>>>>>>>",
    chalk.black.bgGreen(" WELLCOME TO QUIZ "),
    "<<<<<<<<<<<<<<<<"
  )
);
console.log(chalk.blue("\t\t", "+".repeat(60)));

const apiLink: string =
  "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";

let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data);
  let res = await fetchQuiz.json();
  return res.results;
};

let data = await fetchData(apiLink);

let startQuiz = async () => {
  let score: number = 0;
  //   for user name
  let name = await inquirer.prompt({
    name: "fname",
    type: "input",
    message: chalk.black.bgGreen("\n\t\t>>> What is your Name?"),
  });

  for (let i = 1; i <= 5; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];

    let ans = await inquirer.prompt({
      type: "list",
      name: "quiz",
      message: data[i].question,
      choices: answers.map((val: any) => val),
    });

    if (ans.quiz == data[i].correct_answer) {
      ++score;
      console.log(chalk.black.bgBlue("\n\t\t>>> Correct "));
    } else {
      console.log(
        chalk.black.bgRed(
          `\n\t\t>>> Correct answer is ${chalk.bold.red(
            data[i].correct_answer
          )}`
        )
      );
    }
  }
  console.log(
    chalk.black.bgWhite(
      `\n\t\t>>> Dear ${chalk.black.bgGreen(
        name.fname
      )} ,Your Score is ${chalk.red.bold(score)} Out of ${chalk.black.bgGreen(
        " 5 "
      )}`
    )
  );
};
startQuiz();
