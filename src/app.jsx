import React from "react";
import { Persons } from "../src/js/persons.jsx";
import { Search } from "../src/js/search.jsx";
import { Select } from "../src/js/select.jsx";
import { Pagination } from "../src/js/pagination.jsx";

const selectSetup = [12, 5];

class App extends React.Component {
  state = {
    persons: [],
    showItemCount: selectSetup[0],
    currentIndex: 0,
    endIndex: 0,
    headerName: "",
    darkTheme: false,
    testData: -1,
  };

  componentDidMount() {
    fetch(`http://localhost:5555/characters`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          persons: data,
          endIndex: Math.ceil(data.length / this.state.showItemCount),
        })
      );
  }

  selectChange = (e) => {
    const newEndIndex = Math.ceil(this.state.persons.length / e);
    const newCurentIndex = Math.round(
      (this.state.showItemCount * this.state.currentIndex) / e
    );
    this.setState({
      showItemCount: e,
      endIndex: newEndIndex,
      currentIndex:
        newCurentIndex >= newEndIndex ? newEndIndex - 1 : newCurentIndex,
    });
  };

  searchPerson = (str) => {
    fetch(`http://localhost:5555/characters?name_like=${str}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          persons: data,
          currentIndex: 0,
          showItemCount: selectSetup[0],
          endIndex: Math.ceil(data.length / selectSetup[0]),
        })
      );
  };

  pageSwitch = (v) => {
    const newPosition = this.state.currentIndex + v;

    if (newPosition >= 0 && newPosition <= this.state.endIndex) {
      this.setState({
        currentIndex: newPosition,
      });
    }
  };

  goToPage = (v) => {
    this.setState({
      currentIndex: v,
    });
  };

  setName = (n) => {
    this.setState({
      headerName: n,
    });
  };

  changeTheme = () => {
    this.setState({
      darkTheme: this.state.darkTheme ? false : true,
    });
  };

  render() {
    const { persons } = this.state;
    let personCount = persons.length;
    const darkTheme = this.state.darkTheme;

    return (
      <div className={darkTheme ? "dark" : "light"}>
        <header>
          <div className="logo"></div>
          <div className="person_name">{this.state.headerName}</div>
          <div className="utility">
            <div className="theme">
              <button
                className="theme__light theme-button"
                disabled={darkTheme ? false : true}
                onClick={() => this.changeTheme()}
              >
                &nbsp;
              </button>
              <button
                className="theme__dark theme-button"
                disabled={darkTheme ? true : false}
                onClick={() => this.changeTheme()}
              >
                &nbsp;
              </button>
            </div>
            <Select
              selectSetup={selectSetup}
              dataLength={personCount}
              selectChange={this.selectChange}
              showItemCount={this.state.showItemCount}
            />
          </div>
        </header>

        <Search searchPerson={this.searchPerson} />

        {personCount ? (
          <Persons
            persons={persons}
            showItemCount={this.state.showItemCount}
            currentIndex={this.state.currentIndex}
            setName={this.setName}
          />
        ) : (
          <h4>No results found</h4>
        )}

        <Pagination
          curentPosition={this.state.currentIndex}
          endIndex={this.state.endIndex}
          pageSwitch={this.pageSwitch}
          goToPage={this.goToPage}
        />
      </div>
    );
  }
}

export default App;
