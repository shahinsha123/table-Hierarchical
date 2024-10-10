import React, { useState } from "react";
import "./Table.css";

const Table = ({ data, setData }) => {
  const grandTotal = data.reduce((total, row) => total + row.value, 0);

  const updateRow = (id, newValue, type) => {
    const updatedData = [...data]; // Create a copy of the data

    const findAndUpdate = (rows) => {
      if (type == "Value") {
        rows.forEach((row) => {
          if (row.id === id) {
            // If row has children, distribute newValue proportionally to children
            if (row.children) {
              const oldTotal = row.value;
              row.children.forEach((child) => {
                const contributionPercentage = child.value / oldTotal;
                child.value = newValue * contributionPercentage; // Update child value proportionally
              });
            }
            // Update the parent's value to the new value
            row.value = newValue;
          }
          // Recursive call for nested children
          if (row.children) {
            findAndUpdate(row.children);
          }
        });
      } else {
        rows.forEach((row) => {
          if (row.id === id) {
            row.value = newValue;
          }
          if (row.children) {
            row.value = row.children.reduce(
              (sum, child) => sum + child.value,
              0
            );
            findAndUpdate(row.children);
          }
        });
      }
    };

    findAndUpdate(updatedData); // Find and update the row
    setData(updatedData); // Update the state with the new data
  };

  return (
    <>
      <table className="table table-responsive text-center">
        <thead className="thead-dark text-center">
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} row={row} updateRow={updateRow} />
          ))}
        </tbody>
      </table>
      <div className="text-center">
        Grand Total: <h2 className="text-secondary">{grandTotal.toFixed(2)}</h2>
      </div>
    </>
  );
};

const TableRow = ({ row, updateRow, className }) => {
  const [input, setInput] = useState("");
  const [variance, setVariance] = useState(0);

  const handlePercentageChange = () => {
    const newValue = row.value + (row.value * input) / 100;
    updateRow(row.id, newValue, "Persent");
    setVariance(((newValue - row.originalValue) / row.originalValue) * 100);

    if (className) {
      updateRow(className, newValue, "Persent");
    }
  };

  const handleValueChange = () => {
    const newValue = parseFloat(input);
    updateRow(row.id, newValue, "Value");
    setVariance(((newValue - row.originalValue) / row.originalValue) * 100);

    if (className == row.id) {
      updateRow(className, newValue, "Value");
      setVariance(((newValue - row.originalValue) / row.originalValue) * 100);
    } else {
      updateRow(className, newValue, "Persent");
    }
  };

  return (
    <>
      <tr className={className}>
        <td>{row.label}</td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <input
            className="form-control"
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </td>
        <td>
          <button
            className="btn btn-sm btn-primary"
            onClick={handlePercentageChange}
          >
            Allocation %
          </button>
        </td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={handleValueChange}>
            Allocation Val
          </button>
        </td>
        <td>{variance.toFixed(2)}%</td>
      </tr>
      {row.children &&
        row.children.map((child) => (
          <TableRow
            className={row.id}
            key={child.id}
            row={child}
            updateRow={updateRow}
          />
        ))}
    </>
  );
};

export default Table;
