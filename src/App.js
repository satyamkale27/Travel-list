import { useState } from "react";

export default function App() {
  const [items, setitems] = useState([]); // moved the state to parent component of packing list //

  function handleAddItems(item) {
    console.log("item propppp", item); // used here to debug the code //
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
function Logo() {
  return <h1>🌴 Far away 👜</h1>;
}
function Form({ onAddItems }) {
  const [description, setdescription] = useState("");
  const [Quantity, setQuantity] = useState(1);

  function handelsubmit(e) {
    e.preventDefault(); // e is event handler and preventdefault()  function prevents reloading of page
    // (Number(e.target.value)) .value gives string so we used number function to get number and not string from .value
    if (!description) return; // if acts like guard function if there is no description it returns here itself and prevents submission of null string //

    const newItem = { description, Quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    setdescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handelsubmit}>
      <h3>what do you need for your trip?</h3>
      <select
        value={Quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItems }) {
  // onDeleteItem added new prop //
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.Quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
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
