const Table = ({ data, setData }) => {
  const grandTotal = data.reduce((total, row) => total + row.value, 0);
  const updateRow = (id, newValue) => {
    const updatedData = [...data];

    const findAndUpdate = (rows) => {
      rows.forEach(row => {
        if (row.id === id) {
          row.value = newValue;
        }
        if (row.children) {
          row.value = row.children.reduce((sum, child) => sum + child.value, 0);
          findAndUpdate(row.children);
        }
      });
    };

    findAndUpdate(updatedData);
    setData(updatedData);
  };

  // return (
  //   <table>
  //     {/* Table structure */}
  //   </table>
  // );

  return (
    <>    
    <table>
      <thead>
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
        {data.map(row => (
          <TableRow key={row.id} row={row} updateRow={updateRow} />
        ))}
      </tbody>
    </table>
    <div>Grand Total: {grandTotal.toFixed(2)}</div>

    </>
  );
};

const TableRow = ({ row, updateRow }) => {
  const [input, setInput] = useState('');
  const [variance, setVariance] = useState(0);

  const handlePercentageChange = () => {
    const newValue = row.value + (row.value * input / 100);
    updateRow(row.id, newValue);
    setVariance(((newValue - row.originalValue) / row.originalValue) * 100);
  };

  const handleValueChange = () => {
    const newValue = parseFloat(input);
    updateRow(row.id, newValue);
    setVariance(((newValue - row.originalValue) / row.originalValue) * 100);
  };

  return (
    <>
      <tr>
        <td>{row.label}</td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <input 
            type="number" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
        </td>
        <td>
          <button onClick={handlePercentageChange}>Allocation %</button>
        </td>
        <td>
          <button onClick={handleValueChange}>Allocation Val</button>
        </td>
        <td>{variance.toFixed(2)}%</td>
      </tr>
      {row.children && row.children.map(child => (
        <TableRow key={child.id} row={child} updateRow={updateRow} />
      ))}
    </>
  );
};







