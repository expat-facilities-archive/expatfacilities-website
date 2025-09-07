# Contributing to Expat Facilities

[Watch the **-minute walkthrough video on how to contribute to Expat Facilities.](https://youtu.be)

---

- Before jumping into a PR be sure to search [existing PRs](https://github.com/vercel/next.js/pulls) or [issues](https://github.com/vercel/next.js/issues) for an open or closed item that relates to your submission.

## Developing

The development branch is `staging`. This is the branch that all pull requests should be made against. The changes on the `staging` branch are published to the ``master`` branch regularly (most of the time on Wednesday).

To develop locally:

1. [Clone](https://help.github.com/articles/cloning-a-repository/) this repository to your local device.

If you don't need the whole git history, you can clone with depth 1 to reduce the download size:

```sh
git clone --depth=1 https://github.com/expatfacilities/expatfacilities-website
```

2. Create a new branch:

```sh
git checkout -b my-github-username/my-feature-name
```

3. Install yarn:
```sh
npm i -g corepack
```

4. Install the dependencies with:
```sh
yarn
```

5. Start developing and watch for code changes:
```sh
yarn dev
```

### Linting

To check the formatting of your code:

```sh
yarn lint
```
