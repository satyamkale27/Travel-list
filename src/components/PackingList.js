import { useState } from "react";
import Item from "./Item";
export default function PackingList({ items, onDeleteItem, onToggleItems }) {
  // onDeleteItem added new prop //
  // console.log(
  //   "deleteeeitem",
  //   items.map((item) => item.id)
  // ); // used to debug items //
  const [SortBy, setSortBy] = useState("input");
  let sortedItems;

  if (SortBy === "input") sortedItems = items;
  if (SortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (SortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={SortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => items.forEach((item) => onDeleteItem(item.id))}>
          clear list
        </button>
      </div>
    </div>
  );
}
