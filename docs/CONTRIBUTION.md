## Contribution Guide
----
1. First I would like you to contact me at `deondreenglish45@gmail.com` or show your intrest by writing a comment on one of the issues.

2. The Github workflow is a feature rich idea. First check and issue, all github issues should have a number on them. Then go to you terminal and run `git checkout -b C'issue-num'_V1`. Then just push to that branch.
---
## Getting Started

This project uses a monorepo setup that requries using [npm](https://docs.npmjs.com/about-npm) becuase it reliese on [Npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

``` sh
    # install dependencies
    npm install

    # link to root project
    cd packages/ecobot-cli

    npm link

    # create a test project -- Eventually
    cd -
    cd packages/test
    ecobot create test-app
    cd test-app
    npm run dev
```

- IMPORTANT: Anything marked with `-- Eventually` is not yet a properly implemneted feature.
