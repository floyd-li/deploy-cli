/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-11-30 11:16:10
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-12-01 10:06:11
 */
import { readConfig } from "./utils/file.js";
import logger from "./utils/logger.js";
import { exec } from "./utils/system.js";
import type IDeployConfig from "./types/deployConfig.js";
import { NodeSSH } from "node-ssh";

async function build(config: IDeployConfig) {
  if (config.preBuildCommand) {
    for (const cmd of config.preBuildCommand) {
      await exec(cmd);
    }
  }
  await exec(config.buildCommand);
  if (config.postBuildCommand) {
    for (const cmd of config.postBuildCommand) {
      await exec(cmd);
    }
  }
  // check if dist generated succeed
}

async function upload(config: IDeployConfig) {
  const ssh = new NodeSSH();
  await ssh.connect(config);
  if (config.preDeployCommand) {
    for (const cmd of config.preDeployCommand) {
      await ssh.execCommand(cmd);
    }
  }
  await ssh.putDirectory(config.distDir, config.deployDir, {
    recursive: true,
  });
  if (config.postDeployCommand) {
    for (const cmd of config.postDeployCommand) {
      await ssh.execCommand(cmd);
    }
  }
  ssh.dispose();
}

async function doDeploy(file: string): Promise<void> {
  const config: IDeployConfig = await readConfig(file);
  console.table(config);

  logger.log("start build...");
  await build(config);
  console.log("build command executed");
  logger.log("start deploy...");
  await upload(config);
}

export function deploy(configs: Array<string>): void {
  configs.forEach(doDeploy);
}
