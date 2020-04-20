import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

class Risk extends HTMLElement {
  constructor() {
    super();
    this.observer = new MutationObserver(() => this.update());
    this.observer.observe(this, { attributes: true });
    console.log(this.attributes);
 }
  connectedCallback() {
    this.mount();
  }
  
  update() {
    this.unmount();
    this.mount();
 }
  disconnectedCallback() {
    this.unmount();
    this.observer.disconnect();
 }
 mount() {
  const props = {
     ...this.getProps(this.attributes, App.propTypes),
     ...this.getEvents(App.propTypes)
  };
  ReactDOM.render(<App {...props} />, this);
}
unmount() {
  ReactDOM.unmountComponentAtNode(this);
}
getProps(attributes, propTypes) {
  propTypes = propTypes || {};
  return [...attributes]
    .filter((attr) => attr.name !== "style")
    .map((attr) => this.convert(propTypes, attr.name, attr.value))
    .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {});
}
convert(propTypes, attrName, attrValue) {
  const propName = propTypes && Object.keys(propTypes).find(
    (key) => key.toLowerCase() === attrName
  );
  let value = attrValue;
  if (attrValue === "true" || attrValue === "false")
    value = attrValue === "true";
    else if(attrValue === "null") value=null;
    else if(attrValue === "undefined") value= undefined;
    else if (!isNaN(attrValue) && attrValue !== "") value = +attrValue;
    else if (/^[.*]|{.*}/.exec(attrValue)) value = JSON.parse(attrValue);
  return {
    name: propName ? propName : attrName,
    value: value,
  };
}
getEvents(propTypes) {
  return propTypes && Object.keys(propTypes)
     .filter(key => /on([A-Z].*)/.exec(key))
     .reduce((events, ev) => ({
        ...events,
        [ev]: args => 
           this.dispatchEvent(new CustomEvent(ev, { ...args }))
     }), {});
}
}
customElements.define("microfrontends-risk", Risk);

