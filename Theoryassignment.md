
## Theory Assignment: `Chapter - 10 What is seen is sold` 

### Explore all the ways of writing in css.

1. Native css - all components styles in a signle file index.css
2. SCSS - syntactical css - it is then converted to css
3. Inline - style attribute - pass object - {{ backgroundColor: "red"}}
4. Component Library - MaterialUI, Bootstrap, Base web ui, ant design, chakra UI
5. Styled components
6. Css framework - Tailwind 

###2. How do we configure tailwind ?

Steps to use tailwind in react app : 

- Install tailwind css 

```
npm install -D tailwind postcss 
npx tailwind init 

```

__ Config PostCss

```
json {
    "plugins" : {
        "tailwindcss": {}
    }
}

```

__Configure your template paths 

```
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Add the Tailwind directives to your CSS
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. In tailwind.config.js, what does all the keys mean (content, theme, extend, plugins)?

Content 
The content section is where you configure the paths to all your HTML templates, Js components and any other files that contains tailwind class names.

Theme
We can customize color palette, spacing scale, typography scale, or breakpoints using theme section of your tailwind.config.js file 

Plugins
The plugins section allows you to register plugins with tailwind that can be used to generate extra utilities, components, base styles, or custom variants.

###4. Why do we have .postcssrc file ?
While installing tailwind, install postcss as its peer dependency. Create a '.postcssrc' file in project root, and enable the tailwind plugin.

```json
{
  "plugins": {
    "tailwindcss": {}
  }
}
```



