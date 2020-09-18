const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const execa = require('execa');
const originPath = process.cwd();
const entryFilePath = fs.existsSync(`${originPath}/src/index.tsx`) ?
  `${originPath}/src/index.tsx` : fs.existsSync(`${originPath}/src/index.ts`) ?
  `${originPath}/src/index.ts` : null;
if (!entryFilePath) throw Error(`无法找到入口文件: ${originPath}/src/index.tsx 或 ${originPath}/src/index.ts`);
const isProd = process.env.NODE_ENV === 'production';
const outputFilePath = isProd ? path.join(originPath, 'lib') : path.join(originPath, 'dev-build');
const tsCommand = 'tsc';

const tsConfig = [
  entryFilePath,
  '--outDir',
  outputFilePath,
  '--esModuleInterop',
  '--emitDeclarationOnly',
  '--declaration',
  '--jsx',
  'react',
]


const executeCommand = async (command, args, cwd) => {
  try {
    const child = await execa(command, args, {
      cwd,
      stdio: ['inherit', 'inherit', 'inherit']
    });
    child.on('close', code => {
      if (code !== 0) {
        return `command failed: ${command} ${args.join(' ')}`;
      }
      return true;
    })
  } catch (err) {
    return err;
  }
}

const generator = async () => {
  const spinner = ora('正在生成声明文件');
  spinner.start();
  try {
    await executeCommand(tsCommand, tsConfig);
    spinner.succeed();
    console.log(chalk.green('声明文件生成成功'));
  } catch (err) {
    spinner.fail();
    console.log(chalk.red('声明文件生成失败'));
  }
}

generator();
