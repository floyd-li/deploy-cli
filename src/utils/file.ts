/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-11-30 10:07:03
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-12-01 09:23:49
 */
import type { PathLike } from "node:fs";
import * as fsPromises from "node:fs/promises";
import logger from "./logger.js";
import type IDeployConfig from "../types/deployConfig.js";

export async function readConfig(file: PathLike): Promise<IDeployConfig> {
  try {
    const config = await fsPromises.readFile(file, { encoding: "utf8" });
    return JSON.parse(config);
  } catch (err) {
    logger.error(err);
    throw new Error("read config failed");
  }
}
