export default function Form({ onAddItems }) {
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
