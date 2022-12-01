/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-11-30 09:46:26
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-11-30 14:41:54
 */
import chalk from "chalk";

export default {
  log(...args: unknown[]) {
    console.log(chalk.blue(args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.blue(args));
  },
  error(...args: unknown[]) {
    console.log(chalk.red(args));
  },
};
