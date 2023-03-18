# pmanager_client

My name is Sofiane BELAZOUZ and this project is my assignement test.
This Client is used with an API on [this repository](https://github.com/Raven0uss/pmanager_server).

## How to start the client ?

Once the project is clone and you went to the directory install the dependencies.

```bash
npm install
```

Once it's done, launch the project.

```bash
npm start
```

I am using [react-app-rewired](https://github.com/timarney/react-app-rewired) which is a solution to overrides the webpack configurations without `eject` the application. It is really useful for quick projects like that, but the `npm start` is a bit slower to launch the project at first compare to `react-app-scripts`.

Anyway ! You will have a beautiful message :

```bash
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  ...
```

## Run the tests

There is two tests for this project, to check if the user is connected or not with a virtual rendering of the DOM of the page Home as asked.
You can run the tests simply with the following command.

```bash
npm run test
```

Have fun !


### Build

The build is also of course working, you can build the application with these following command to try out.

```bash
npm run build
```
