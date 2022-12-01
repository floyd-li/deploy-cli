/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-11-30 15:14:29
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-11-30 17:44:40
 */

export default interface IDeployConfig {
  env: string;
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKeyPath?: string;
  distDir: string;
  preDeployCommand?: Array<string>;
  deployDir: string;
  postDeployCommand?: Array<string>;
  preBuildCommand?: Array<string>;
  buildCommand: string;
  postBuildCommand?: Array<string>;
}
