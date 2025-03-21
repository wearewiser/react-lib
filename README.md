# {{pkg}}

Generated with `{{exe}}`.

## Usage

### Installation

Install the package using `npm install --save {{pkg}}`. The package should now be available to be included in your React 19 project.

### Importing

There are a number of files that are exported from this library. You will be able to import styles, pages, components, utilities, hooks, models, data, images, and static files.

The examples are going to assume this library is being installed into a Next.js application. [Next.js 15](https://nextjs.org/blog/next-15) is being used for these examples.

It should be noted that some files are exported directly from the package, and others are scoped to their respective directories only. Elements that are available directly from the package root include:
- Pages
- Components
- Utils
- Hooks
- Models

#### Importing Styles

Global styles in the `./src/styles/globals.scss` file, and all its associated imports, are compiled into a module that is available in the package's `styles` path. These can be imported in the client's `src/app/layout.tsx` file.

**Example Usage**
```TSX
// layout.tsx
import type { Metadata } from "next";
...
import "{{pkg}}/styles";
import "./globals.css";
...
```
> **Note**
>
> Import your local globals.scss file afterwards so that default styles provided by the library can be overwritten.

### Importing Pages
Pages exported by the library can be used as standalone pages in your Next.js app. For example, if the library exports a page component from {{pkg}}, you can add it to your Next.js routing system by importing a `page.tsx` page component and exporing it directly as default.

**Example Usage**
```TSX
import { Home } from "{{pkg}}";

export default Home; 
```

### Importing Components

Components are available root exports in the {{pkg}} package. These can be imported into TSX files and used as react components.

**Example Usage**
```TSX
import { Header } from "{{pkg}}";

export default function AboutPage() {
  return (
    <div>
      <Header />
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </div>
  );
}
```

### Importing Utilities
Utility functions are available from the utils path. They can be included in any TS files.

**Example Usage**
```TSX
import {
  pickUser,
  User,
} from "{{pkg}}";
import { USERS } from "{{pkg}}/data";

...

const random_user: User = pickUser(USERS);
```

### Importing Hooks

The library includes a set of reusable hooks to simplify common state and behavior patterns in your React applications. These can be imported into TSX files from the @wiser/react-ui root.

**Example Usage**
```TSX
import React from "react";
import { useToggle } from "{{pkg}}";

export default function ToggleExample() {
  const [isToggled, toggle] = useToggle(false);

  return (
    <div>
      <p>The toggle is {isToggled ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```
> **Note**
>
> You will need to ensure that the usage is scoped to the browser. We've included "use-client" in this example to accomplish this.

### Importing Models
Models are available from the root path of the {{pkg}} package. They can be included in any TS files.

**Example Usage**
```TSX
import {
  pickUser,
  User,
} from "{{pkg}}";
import { USERS } from "{{pkg}}/data";

...

const random_user: User = pickUser(USERS);
```

### Importing Data
Hard coded data is available from the data path in the {{pkg}} package. This can be included in any TS files.

**Example Usage**
```TSX
import { USERS } from "{{pkg}}/data";

console.log(USERS);
```

### Importing Images
Images can be imported from the {{pkg}} package, under the images directory. Also import the Image component from next/image and pass the imported image into Image's src attribute directive.

**Example Usage**
```TSX
import wiser_image from "{{pkg}}/images/wiser.png";
import Image from "next/image";

export default function HelloPage() {
  return (
    <div>
      <h1>Hello</h1>
      <Image src={wiser_image} alt="Logo" width={256} height={81}  />
    </div>
  );
}
```

### Importing Static Files
Files under `./src/static/files` are copied into the project's `./public/files` directory. If this directory does not exist, it will be created. This will be triggered every time the packatge is explicity installed or upgraded. The behaviour of this synchronization process can be configured with a `.wiserrc` file.

**.wiserrc**
```ini
[files]
skip=false
destination=public/files
overwrite=false
```
> **Note**
>
> These are the default values that will be applied if a `.wiserrc` file is not found in the root of the consuming project directory. If the `.wisrrc` file is included, then all values must be provided.

**Example Usage**
```bash
$ npm install --save {{pkg}}@latest --foreground-scripts

**Example Usage**
...

found 0 vulnerabilities

> {{pkg}}@0.0.0 postinstall
> copy-static 2>/dev/null || exit 0

Postinstall: forking and waiting MAX 5s for static assets...
Static files copied from /home/johnfedoruk/Projects/@wearewiser/wiser-react-test/node_modules/{{pkg}}/lib/static/files to /home/johnfedoruk/Projects/@wearewiser/wiser-react-test/public/files
...
```
> **Note**
>
> You do not need to pass --foreground-scripts unless you want to see the output.

```TSX
export default function DownloadPage() {
  return (
    <div>
      <h1>Download</h1>
      <ul>
        <li><a href="files/top_secret.pdf" target="_blank">Top Secret</a></li>
      </ul>
    </div>
  );
}

```

## Development

### Building with External Component Dependencies

When building components that have a NextJS component dependencies, you will need to follow two steps: First, include NextJS as peer dependency with `npm install --save next@15`. Second, configure webpack to avoid bringing in NextJS context into the compiled bundle. This is done by adding NextJS to this library's Webpack externals configuration.

As an example, after installing next as a dependency, the `src/ui/components/molecules/Logo/Logo.tsx` file can be updated to use NextJS' Image component:

```TSX
import styles from "./Logo.module.scss";
import React from "react";
import Image from "next/image";

export interface LogoProps {
  src: string;
}

const Logo: React.FC<LogoProps> = ({ src }) => {
  return (
    <Image className={styles.logo} src={src} alt="Hello" height="24" width="77" />
  );
};

export default Logo;
```

and then `webpack.config.js` can be updated to include NextJS as an external package:


```js
...
module.exports = {
  ...
  externals: {
    ...
    "next": "commonjs next",
    "next/image": "commonjs next/image"
  }
  ...
};
```

### Scripts

#### npm run build
Builds the project and outputs it to the `./lib/` directory. Bundled with webpack and outputs a single importable TypeScript file and single component scoped style module.

#### npm run lint
Runs the linter.

#### npm run test
Runs the unit tests.

#### npm run clean
Cleans the project directory of all compilation artifacts.

#### npm run docs
Generates the TSDocs for the current project.

#### npm run storybook
Launches a storybook server to view components.
