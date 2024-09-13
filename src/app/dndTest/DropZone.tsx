import React, { useCallback, useState } from "react";
import { Draggable } from "./draggable";
import update from "immutability-helper";

export function DropZone({ dndCharacterData }) {
  //grabbing api data and rendering it with `renderDndCharacterDnDFormGroups`
  const [dndCharacters, setDndCharacters] = useState(dndCharacterData);

  //a memoized function that uses js `immutability-helper` & `splice` to update the
  //order of our rows
  const moveRow = useCallback((dragIndex, hoverIndex) => {
    setDndCharacters((prevCharacters) =>
      update(prevCharacters, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCharacters[dragIndex]]
        ]
      })
    );
  }, []);

  const renderDndCharacterDnDFormGroups = () =>
    dndCharacters.map((dndCharacter, index) => (
      <Draggable
        index={index}
        key={dndCharacter.id}
        dndCharacter={dndCharacter}
        moveRow={moveRow}
      />
    ));

  return (
    <div
      style={{
        border: "1px solid blue",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "10px"
      }}
    >
      <h2>Drop Zone</h2>
      {renderDndCharacterDnDFormGroups()}
    </div>
  );
}