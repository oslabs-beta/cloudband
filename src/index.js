import React from "react";
import App from "./App.jsx";
//import { render } from "react-dom"; --> deprecated, apparently. createRoot method (see below) is part of the new API for rendering React components in the DOM, which was introduced in React 18. This API replaces the old render method, which has been deprecated and will be removed in a future version of React.



// import "./stylesheets/styles.scss";
import { createRoot } from 'react-dom/client';

//render(<App />, document.getElementById("root"));

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
        <App />
    );