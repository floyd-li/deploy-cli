<!--
 * @Description: 
 * @Author: Floyd Li (floyd.li@outlook.com)
 * @Date: 2022-11-29 11:03:05
 * @LastEditors: Floyd Li (floyd.li@outlook.com)
 * @LastEditTime: 2022-12-01 10:59:39
-->
# i-deploy

## a simple yet useful cli for deploy front end project

### install

- clone the git repository
- install typescript globally using `npm install -g typescript`
- install the dependencies using `npm install`
- build the project using `npm build`
- link the command to system using `npm link`
- well done! you can now using `i-deploy -c <config files>` in which project you need to deploy

### command description

- `-h, --help`: show the help information
- `-v, --version`:show the version information
- `-c, --config <config files>`: deploy with config file(s), you can pass one or more config files like `i-deploy -c ./dev.json ./prod.json`

### config description

```json
{
  "env": "dev", // a description of the environment
  "host": "192.168.1.1", // host of the server to deploy
  "port": 22, // port of the host
  "username": "root", // username
  // note: one of the 'password' or 'privateKeyPath' must be provided
  "password": "password", // password
  "privateKeyPath": "~/.ssh/id_rsa", // private key path
  "distDir": "./dist", // local build directory
  // note: all of these build-related command will be executed locally
  "preBuildCommand": ["rm -rf ./dist"], // pre build command (optional)
  "buildCommand": "yarn build", // build command
  "postBuildCommand": ["echo 'build success'"],//post build command (optional)
  // note: all of these deploy command will be executed on the server
  "preDeployCommand": ["rm -rf /folder/to/deploy/*"], // pre deploy command (optional)
  "deployDir": "/folder/to/deploy", // deploy directory on the server
  "postDeployCommand": ["nginx -s reload"] // post deploy command (optional)
}
```
