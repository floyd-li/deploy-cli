/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-11-30 10:07:03
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-12-01 14:54:23
 */
import type { PathLike } from "node:fs";
import { readFile } from "node:fs/promises";
import type IDeployConfig from "../types/deployConfig.js";
import chalk from "chalk";

export async function readConfig(file: PathLike): Promise<IDeployConfig> {
  try {
    const config = await readFile(file, { encoding: "utf8" });
    return JSON.parse(config);
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error("read config failed");
  }
}
