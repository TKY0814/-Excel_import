import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const handleSubmit = newData => {
    setData(prevData => [...prevData, newData]);
  };

  const handleEdit = (index, newData) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = newData;
      return updatedData;
    });
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} />
      <Table data={data} onEdit={handleEdit} />
      <button className="export-button" onClick={handleExport}>Export to Excel</button>
    </div>
  );
}

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Name:
          <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Email:
          <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Phone:
          <input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
      </div>
      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
}

function Table({ data, onEdit }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.phone}</td>
            <td>
              <EditForm data={row} onSubmit={newData => onEdit(index, newData)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EditForm({ data, onSubmit }) {
  const [formData, setFormData] = useState(data);

  const handleChange = e => {
    setFormData({...formData,
      [e.target.name]: e.target.value,
    });};

    const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    };
    
    return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label className="form-label">
    Name:
    <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
    </label>
    </div>
    <div className="form-group">
    <label className="form-label">
    Email:
    <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
    </label>
    </div>
    <div className="form-group">
    <label className="form-label">
    Phone:
    <input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
    </label>
    </div>
    <button className="save-button" type="submit">Save</button>
    </form>
    );
    }
    
    export default App;
