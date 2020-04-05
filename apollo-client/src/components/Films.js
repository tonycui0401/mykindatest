import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo/index";

const FETCH_ALL_FILMS = gql`
  query getFilms {
    starships {
      name
      model
      speed
    }
  }
`;

export const Films = () => {
  return (
    <Query query={FETCH_ALL_FILMS} pollInterval={500}>
      {({ data, loading, error, refetch }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          console.error(error);
          return <div>Error!</div>;
        }
        return (
          <div>
            <button onClick={() => refetch()}>Refetch!</button>
            {data.starships.map(starship => (
              <div key={starship.name}>{starship.speed}</div>
            ))}
          </div>
        );
      }}
    </Query>
  );
};
