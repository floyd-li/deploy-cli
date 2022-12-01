/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-11-30 11:16:10
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-12-01 15:30:42
 */
import { readConfig } from "./utils/file.js";
import { exec } from "./utils/system.js";
import { funcWrapper } from "./utils/utils.js";
import type IDeployConfig from "./types/deployConfig.js";
import { NodeSSH } from "node-ssh";
import chalk from "chalk";
async function build(config: IDeployConfig) {
  if (config.preBuildCommand && config.preBuildCommand.length > 0) {
    for (const cmd of config.preBuildCommand) {
      await funcWrapper(exec)(`Executed local command ${cmd}`, cmd);
    }
  }
  await funcWrapper(exec)("Building", config.buildCommand);
  if (config.postBuildCommand && config.postBuildCommand.length > 0) {
    for (const cmd of config.postBuildCommand) {
      await funcWrapper(exec)(`Executed local command ${cmd}`, cmd);
    }
  }
  // TODO check if dist generated succeed
}

async function upload(config: IDeployConfig) {
  const ssh = new NodeSSH();
  await ssh.connect(config);
  if (config.preDeployCommand && config.preDeployCommand.length > 0) {
    for (const cmd of config.preDeployCommand) {
      await funcWrapper(ssh.execCommand.bind(ssh))(
        `Executed shell command ${cmd}`,
        cmd
      );
    }
  }
  await funcWrapper(ssh.putDirectory.bind(ssh))(
    "Upload dist to remote",
    config.distDir,
    config.deployDir
  );
  if (config.postDeployCommand && config.postDeployCommand.length > 0) {
    for (const cmd of config.postDeployCommand) {
      await funcWrapper(ssh.execCommand.bind(ssh))(
        `Executed shell command ${cmd}`,
        cmd
      );
    }
  }
  ssh.dispose();
}

export async function deploy(configs: Array<string>): Promise<void> {
  for (const file of configs) {
    const config: IDeployConfig = await readConfig(file);
    console.log("################## deploy configs ##################");
    console.log(config);
    console.log("####################################################");
    await build(config);
    await upload(config);
    console.log(chalk.green("Deploy succeed!"));
  }
}
