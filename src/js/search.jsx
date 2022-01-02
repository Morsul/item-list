import React from "react";

export class Search extends React.Component {
  state = {
    search: "",
  };

  searchChange = (e) => {
    if (e.key === "Enter") {
      this.props.searchPerson(this.state.search);
    }
  };

  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.state.search}
          onChange={(e) => this.setState({ search: e.target.value })}
          onKeyDown={this.searchChange}
          placeholder="Search for cartoon hero"
        />
      </div>
    );
  }
}
