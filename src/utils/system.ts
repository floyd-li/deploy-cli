/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-07-18 17:28:00
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-12-01 11:26:37
 */
import child_process from "child_process";

export function exec(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    child_process.exec(command, (err, stdout: string) => {
      if (err === null) {
        resolve(stdout);
      } else {
        reject(err.message);
      }
    });
  });
}
