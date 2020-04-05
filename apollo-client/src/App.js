import React from "react";
import "./App.css";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import  {Films}  from "./components/Films";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:5000"
    }),
    cache: new InMemoryCache()
  });
};

function App() {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Films />
      </div>
    </ApolloProvider>
  );
}

export default App;
