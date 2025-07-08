import React, { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import Select from 'react-select';

type DataRow = Record<string, string | number>;
type FilterOptions = Record<string, string[]>;

const App = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as DataRow[];
        setData(parsedData);
        if (parsedData.length > 0) {
          const keys = Object.keys(parsedData[0]);
          setColumns(keys);
          const initialOptions: FilterOptions = {};
          keys.forEach((col) => {
            const values = Array.from(new Set(parsedData.map((row) => row[col]?.toString()))).sort();
            initialOptions[col] = values;
          });
          setFilterOptions(initialOptions);
        }
      },
    });
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.entries(filters).every(([col, selected]) =>
        selected.length === 0 || selected.includes(row[col]?.toString())
      )
    );
  }, [data, filters]);

  useEffect(() => {
    const newOptions: FilterOptions = {};
    columns.forEach((col) => {
      const values = Array.from(
        new Set(
          filteredData.map((row) => row[col]?.toString())
        )
      ).sort();
      newOptions[col] = values;
    });
    setFilterOptions(newOptions);
  }, [filteredData, columns]);

  const handleFilterChange = (col: string, selected: any) => {
    setFilters((prev) => ({
      ...prev,
      [col]: selected.map((option: any) => option.value),
    }));
  };

  return (
    <div className="p-4 max-w-full">
      <h1 className="text-2xl font-bold mb-4">Amazon-style Filter Dashboard</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {columns.map((col) => (
          <div key={col}>
            <label className="block font-semibold mb-1">{col}</label>
            <Select
              isMulti
              options={filterOptions[col]?.map((val) => ({ value: val, label: val })) || []}
              onChange={(selected) => handleFilterChange(col, selected)}
              placeholder={`Filter ${col}`}
            />
          </div>
        ))}
      </div>
      <div className="overflow-x-auto max-h-[400px] overflow-y-scroll">
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {columns.map((col) => (
                <th key={col} className="border px-2 py-1 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, 100).map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col} className="border px-2 py-1">{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
