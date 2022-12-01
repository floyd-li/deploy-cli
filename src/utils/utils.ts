/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-12-01 11:55:57
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-12-01 15:28:15
 */
import ora from "ora";
import chalk from "chalk";

export const funcWrapper =
  (func: any) =>
    async (tips: string, ...args: Array<unknown>) => {
      const spinner = ora(chalk.blue(tips)).start();
      try {
        await func.apply(this, args);
        spinner.succeed(`${tips} succeed!`);
      } catch (e) {
        spinner.fail(`${tips} failed!`);
        throw new Error(`Executing ${tips} failed: `);
      }
    };
