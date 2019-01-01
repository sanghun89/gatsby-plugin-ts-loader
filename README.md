# gatsby-plugin-ts-loader

Provides plug-n-play support for [Typescript](http://www.typescriptlang.org/) and [tslint](https://palantir.github.io/tslint/) in Gatsby.

## Install

`npm install gatsby-plugin-ts-loader`

## Motivation

The only other option for adding typescript to Gatsby at the time of writing is [gatsby-plugin-typescript](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-typescript), which does not use the typescript compiler but instead a babel plugin. Therefore it does not do type checking and you are required to install a separate plugin to check types. In addition, you are required to install a third plugin for linting. I would also argue that most react developers prefer ts-loader over the babel plugin, which could just be my perspective, but the plugins listed above were the first time I even came someone using the babel plugin.

I wrote this to reduce the required number of plugins to get up and running with typescript and to also do typescript in a way more react developers are accustomed to, using the same tools most frontend developers already use. I also wanted to make it very easy for new developers to get up and running by simplifying the process and providing better documentation than other options.

## How to use

1. Install plugin via your prefered package manager
1. Include the plugin in your `gatsby-config.js` file, optionally enabling `tslint` (defaults to: `false`)
1. Add a `tsconfig.json` file to the root of your site (example below)
1. If using `tslint`, add a `tslint.json` file to the root of your project (example below)
1. Optionally install [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) definitions for any of your dependencies that require it.
1. You are now free to write Typescript inside any file with a `.ts` or `.tsx` file. To use the jsx syntax, your file must have the `.tsx` extension.
1. If you have an existing project written in javascript you are able to incrementally convert the project to typescript as needed. See the [conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide) for help. Your `.js` files will continue to work. Note that sometimes gatsby crashes when changing file names, simply restart the dev-server and you will be good to go.

### Example gatsby-config.js

```javascript
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-ts-loader",
      options: {
        tslint: true // false or exclude to disable tslint
      }
    }
  ]
};
```

### Example tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    // uncomment the following lines if you are working with a mixed code base (both javascript and typescript. Useful when migrating a project)
    // "noImplicitAny": true,
    // "allowJs": true,
    "module": "commonjs",
    "target": "esnext",
    "jsx": "react",
    "lib": ["dom", "esnext"]
  },
  "include": ["./src/**/*"]
}
```

### Example tslint.json

```json
{
  "extends": "tslint:recommended",
  "rules": {
    "quotemark": [true, "single", "jsx-single", "avoid-escape"]
  }
}
```

## Possible Features

These are some of my ideas for things I would like to add to this in the future. These shouldn't break any of the existing functionality. I will add a feature when I need it myself or if someone ask (nicely) for it or better yet, opens up a PR for it. If you have any ideas for what you would like to add, please feel free to open an issue.

- Optionally use [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin) to check types in a separate process instead of in the main webpack thread.

## Contributing

- If you see something listed under Possible Features, open an issue if one is not already open and assign it to yourself. I will check in periodically to see if you are still working on it if it has been open more than a few days. If it seems abandoned I will close it so someone else can take it on if they wish.
- If you find a bug or would like a new feature, open an issue and I will try to be as responsive as possible.
