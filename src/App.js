const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
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
  return <h1>🌴Far away 👜</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h2>what do you need for your trip?</h2>
    </div>
  );
}
function PackingList() {
  return (
    <div>
      <ul className="list">
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return <li>{item.description}</li>;
}

function Stats() {
  return (
    <footer className="stats">
      <em>you have X items on your list, you already packed X (X%)</em>
    </footer>
  );
}
