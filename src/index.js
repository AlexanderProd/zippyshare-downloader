#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const { exec, spawn } = require('child_process');
const decrypt = require('decrypt-dlc');
const readline =  require('readline');
const { writeFile } = require('fs');

const optionDefinitions = [
  { name: 'file', alias: 'f', type: String },
  { name: 'outdir', alias: 'd', type: String, defaulOption: '.' },
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

const decryptDlc = (file) => {
  console.log('Unpacking dlc file...')
  decrypt.upload(file, (err, response) => {
    const links = response.success.links;
    writeFile('urls.txt', String(links).replace(/,/g, '\n'), 'utf-8', () => {return});
  });
};

const main = async () => {
  console.log('Downloading latest algorithm...');
  await spawn(
    'curl', [
      '-o', 
      './src/zippyshare.sh', 
      'https://raw.githubusercontent.com/ffluegel/zippyshare/master/zippyshare.sh'
    ]
  );
  let file = options.file || await readLine('Enter file location');

  if(file.indexOf('.dlc') > -1){
    await decryptDlc(file);
    file = 'urls.txt';
  };

  spawn('./src/zippyshare.sh', [file], { stdio: 'inherit' });
}
main();
