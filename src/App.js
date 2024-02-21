import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Item from "./Item";
export default function App() {
  const [items, setitems] = useState([]); // moved the state to parent component of packing list //

  function handleAddItems(item) {
    // console.log("item propppp", item.id); // used here to debug the code //
    setitems((items) => [...items, item]);
  }

  function handelDeleteItem(id) {
    console.log("item idddd", id); // used here to debug the code //
    setitems((items) => items.filter((item) => item.id !== id));
  }

  function handelToggleItem(id) {
    setitems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handelDeleteItem}
        onToggleItems={handelToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀 </em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈"
          : `you have ${numItems} items on your list, you already packed
         ${numPacked}
        (${percentage}%)`}
      </em>
    </footer>
  );
}
