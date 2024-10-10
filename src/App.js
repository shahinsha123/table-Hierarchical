import React, { useState } from "react";
import Table from "./Table/Table";

const initialData = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    originalValue: 1500,
    children: [
      { id: "phones", label: "Phones", value: 800, originalValue: 800 },
      { id: "laptops", label: "Laptops", value: 700, originalValue: 700 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    originalValue: 1000,
    children: [
      { id: "tables", label: "Tables", value: 300, originalValue: 300 },
      { id: "chairs", label: "Chairs", value: 700, originalValue: 700 },
    ],
  },
];

function App() {
  const [data, setData] = useState(initialData);

  return (
    <div className="App">
      <div className="card">
        <div className  ="card-body overflow-auto">
          
          <Table data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default App;
