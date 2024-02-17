import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setitems] = useState([]); // moved the state to parent component of packing list //
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far away 👜</h1>;
}
function Form() {
  const [description, setdescription] = useState("");
  const [Quantity, setQuantity] = useState(1);

  function handleAddItems(item) {
    setitems((items) => [...items, item]);
  }

  function handelsubmit(e) {
    e.preventDefault(); // e is event handler and preventdefault()  function prevents reloading of page
    // (Number(e.target.value)) .value gives string so we used number function to get number and not string from .value
    if (!description) return; // if acts like guard function if there is no description it returns here itself and prevents submission of null string //

    const newItem = { description, Quantity, packed: false, id: Date.now() };
    console.log(newItem);
    handleAddItems(newItem);

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
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>you have X items on your list, you already packed X (X%)</em>
    </footer>
  );
}
