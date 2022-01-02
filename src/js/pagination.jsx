import React from "react";

export function Pagination(props) {
  return (
    <>
      {props.endIndex > 1 && (
        <div className="pagination">
          <button
            className="pagination__prev"
            onClick={() => props.pageSwitch(-1)}
            disabled={props.curentPosition > 0 ? false : true}
          >
            &nbsp;
          </button>
          <ul className="pagination__nav">
            {setPagination(
              props.endIndex,
              props.goToPage,
              props.curentPosition
            )}
          </ul>
          <button
            className="pagination__next"
            onClick={() => props.pageSwitch(1)}
            disabled={props.curentPosition + 1 < props.endIndex ? false : true}
          >
            &nbsp;
          </button>
        </div>
      )}
    </>
  );
}

function setPagination(endIndex, goToPage, curentPosition) {
  let list = [];
  let val;
  let pushToList = true;

  for (let i = 0; i < endIndex; i++) {
    let goTo;

    if (i == 0 || i == endIndex - 1) {
      val = i + 1;
      goTo = i;
      pushToList = true;
    } else {
      if (
        curentPosition + 1 == i ||
        curentPosition - 1 == i ||
        curentPosition == i ||
        (curentPosition >= 0 && curentPosition < 4 && i < 5) ||
        (curentPosition > endIndex - 5 &&
          curentPosition <= endIndex - 1 &&
          i > endIndex - 6)
      ) {
        val = i + 1;
        goTo = i;
        pushToList = true;
      } else if (val != "...") {
        val = "...";
        goTo =
          i < curentPosition
            ? Math.ceil((curentPosition - 1) / 2)
            : Math.ceil((endIndex - curentPosition) / 2 + curentPosition);
        pushToList = true;
      } else {
        pushToList = false;
      }
    }

    if (pushToList) {
      list.push(
        <li
          className={i == curentPosition ? "pagination__nav__active" : ""}
          key={"pagination" + i}
          onClick={() => goToPage(goTo)}
        >
          {val}
        </li>
      );
    }
  }
  return list;
}
