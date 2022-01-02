import React from "react";

export function Persons(props) {
  const { persons, showItemCount, currentIndex, setName } = props;

  return (
    <div className="result">
      <ul className="card_list">
        {persons
          .slice(
            currentIndex * showItemCount,
            currentIndex * showItemCount + showItemCount * 1
          )
          .map((person) => (
            <Person key={person.id} {...person} setName={setName} />
          ))}
      </ul>
    </div>
  );
}

function Person(props) {
  const { name, url } = props;
  return (
    <li className="card" onClick={() => props.setName(name)}>
      <div className="card__image">
        <img src={url} alt="" width="48" height="48" />
      </div>
      <p className="card__name">{name}</p>
    </li>
  );
}
