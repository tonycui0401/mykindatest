import React, { Component } from "react";
import "./App.css";
import {
  Button,
  Icon,
  Row,
  Col,
  Card,
  Chip,
  Preloader
} from "react-materialize";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      player1: "",
      massPlayer1: "",
      player2: "",
      player1Won: false,
      player2Won: false
    };
  }

  componentDidMount() {
    this.getPeople();
  }

  getReplay = () => {
    this.getPeople();
  };

  getPeople = () => {
    this.setState({
      isLoading: true
    });
    return fetch("https://swapi.co/api/starships/?format=json")
      .then(response => response.json())
      .then(json => {
        const newResults = json.results;
       console.log(newResults)
        const newPlayers = newResults.map(element => [
          element.max_atmosphering_speed,
          element.name
        ]);
        const newPlayer1 = newResults.map(element => [
          element.max_atmosphering_speed,
          element.name
        ]);
        const newPlayer2 = newResults.map(element => [
          element.max_atmosphering_speed,
          element.name
        ]);
        console.log(Math.floor(Math.random() * newPlayer1.length));
        newPlayers.forEach((index, array) => {
          const randomPlayer1 =
            newPlayer1[Math.floor(Math.random() * newPlayer1.length)][0];
          const randomPlayer2 =
            newPlayer2[Math.floor(Math.random() * newPlayer2.length)][0];

          if (randomPlayer1 > randomPlayer2) {
            if (randomPlayer1 !== randomPlayer2) {
              console.log("Player1 win ");
              this.setState({
                player1Won: true,
                player2Won: false
              });
            }
          }

          if (randomPlayer1 < randomPlayer2) {
            if (randomPlayer2 !== randomPlayer1) {
              console.log("Player1 win ");
              this.setState({
                player2Won: true,
                player1Won: false
              });
            }
          } else {
            console.log(
              "Tow idatice player can play, please relod a new game "
            );
          }

          this.setState({
            people: array,
            isLoading: false,
            player1: randomPlayer1,
            player2: randomPlayer2
          });
        });
      })
      .catch(error => {
        // Error!!!
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    const {
      isLoading,
      player1,
      player2,
      player1Won,
      player2Won
    } = this.state;

    if (isLoading) {
      return (
        <Row>
          <Col s={12}>
            <Preloader flashing />
          </Col>
        </Row>
      );
    }

    return (
      <section className="App">
        {/* <Navbar brand="Star Wars Top Trumps" right>
        </Navbar>
  */}
        {isLoading ? (
          <Preloader size="small" />
        ) : (
          <Row>
            <Col s={6} className="grid-example">
              <Card
                className="blue-grey darken-1"
                textClassName="white-text"
                title={`Player 1: ${player1}`}
              />

              {/* Chip */}
              {player1Won === true ? (
                <Chip>
                  <img src="account_circle_black.svg" alt={player1} />
                  Player 1 Won
                </Chip>
              ) : null}
            </Col>
            <Col s={6} className="grid-example">
              <Card
                className="blue-grey darken-1"
                textClassName="white-text"
                title={`Player 2: ${player2}`}
              />
              {player2Won === true ? (
                <Chip>
                  <img src="account_circle_black.svg" alt={player1} />
                  Player 2 Won
                </Chip>
              ) : null}
            </Col>
          </Row>
        )}
        <Row>
          <Col s={12} className="grid-example">
            <Button waves="light" onClick={() => this.getReplay()}>
              button<Icon right>refresh</Icon>
            </Button>
          </Col>
        </Row>
      </section>
    );
  }
}

export default App;
