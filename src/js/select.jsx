import React from "react";

let optionsList = [];

export function Select(props) {
  const selectSetup = props.selectSetup;
  const dataLength = props.dataLength;
  optionsList = [
    {
      label: selectSetup[0],
      value: selectSetup[0],
    },
  ];

  if (dataLength) {
    // make list of values for Option list
    setSelectValues(selectSetup, dataLength);
  }

  return (
    <select
      name="shown_items"
      id="shown_items"
      disabled={optionsList.length < 2 ? true : null}
      onChange={(e) => props.selectChange(e.target.value * 1)}
      value={props.showItemCount}
    >
      {optionsList.map((option, i) => (
        <option key={`option${i}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function setSelectValues(selectSetup, dataLength) {
  if (optionsList.length < selectSetup[1]) {
    for (let i = 2; i < selectSetup[1]; i++) {
      let optVal = selectSetup[0] * i;

      if (optVal < dataLength) {
        optionsList.push({ label: optVal, value: optVal });
        if (i == 4) {
          optionsList.push({ label: "All", value: dataLength });
        }
      } else if (optVal > dataLength && optionsList[i - 2].label < dataLength) {
        optionsList.push({ label: "All", value: dataLength });
        break;
      } else {
        break;
      }
    }
  }
}
