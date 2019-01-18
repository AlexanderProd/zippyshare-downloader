#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const { spawn } = require('child_process');
const { upload } = require('decrypt-dlc');
const readline =  require('readline');
const { writeFile } = require('fs');
const ora = require('ora');

const optionDefinitions = [
  { name: 'file', alias: 'f', type: String },
];

const options = commandLineArgs(optionDefinitions);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLine = (prompt, type) => new Promise((res) => {
  rl.question(`${prompt}: `, (input) => {
    rl.close();
    const answer = type === 'number' ? Number(input) : input;
    res(answer);
  });
});

const main = async () => {
  /* const spinner = ora('Downloading latest algorithm...').start();
  await spawn(
    'curl', [
      '-o', 
      './src/zippyshare.sh', 
      'https://raw.githubusercontent.com/ffluegel/zippyshare/master/zippyshare.sh'
    ]
  );
  let file = options.file || await readLine('Enter file location');
  spinner.succeed(); */

  if (file.indexOf('.dlc') > -1) {
    const spinner = ora('Decrypting DLC...').start();
    upload(file, (err, response) => {
      const links = response.success.links;
      writeFile('urls.txt', String(links).replace(/,/g, '\n'), 'utf-8', () => {
        spinner.succeed();
        spawn('./src/zippyshare.sh', ['urls.txt'], { stdio: 'inherit' });
      });
      if (err) {
        spinner.fail();
        console.error(err);
      }
    });
  } else {
    spawn('./src/zippyshare.sh', [file], { stdio: 'inherit' });
    return process.exit();
  }
};

main();
