#!/usr/bin/env node
/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-11-29 11:01:31
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-12-01 09:51:06
 */

import { deploy } from "./deploy.js";
import { Command } from "commander";
const program = new Command();

program
  .name("deploy-cli")
  .description("a cli for deploy frontend project")
  .version("0.0.1");

program
  .option("-c, --config <file...>", "deploy config file")
  .action((option) => {
    const configs: Array<string> = option.config;
    if (!configs || configs.length === 0) {
      throw new Error("Config file not set!");
    }
    deploy(configs);
  });
program.parse();
