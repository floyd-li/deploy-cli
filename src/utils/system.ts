/*
 * @Description:
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-07-18 17:28:00
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-11-29 17:36:39
 */
import child_process from "child_process";

export function exec(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    child_process.exec(command, (err, stdout: string) => {
      if (err === null) {
        console.log(
          "🚀 ~ file: system.ts ~ line 15 ~ child_process.exec ~ stdout",
          stdout
        );
        resolve(stdout);
      } else {
        console.log(
          "🚀 ~ file: system.ts ~ line 21 ~ child_process.exec ~ err",
          err.message
        );
        reject(err.message);
        // process.exit(1);
      }
    });
  });
}
