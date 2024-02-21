import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
