import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import SearchInterface from "./SearchInterface";
import GiphyFetch from "./GiphyFetch";

const App: React.FC = () => {
  return (
    <div className="giphy-body">
      <h1>Finding GIPHY!</h1>
      <SearchInterface />
    </div>
  );
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);