### Setting up and running the ToDo client on all platforms.

#### If you are using GNU/Linux, Docker may not support host.docker.internal without additional configuration.

The easiest way to solve this is to change the `nuxt.config.ts` file's runtime config `GQL_HOST` to `http://localhost/graphql`. This is also what should be done if you don't want to run the project with Docker.

```
  runtimeConfig: {
    public: {
      GQL_HOST: 'http://host.docker.internal/graphql' // overwritten by process.env.GQL_HOST
    }
  },
```

Next, run the following commands:

`docker build -t todo-test-client .`

`docker run -p 3000:3000 todo-test-client`

If the app is working correctly, it must display

```

> start
> node .output/server/index.mjs

Listening on http://[::]:3000

```

This client can now be accessible via http://localhost:3000.

#### I tested the repository on:

- Windows 11 x64
- Ubuntu 22 and 23
- Fedora 39 x64
