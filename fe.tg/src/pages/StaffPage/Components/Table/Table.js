import React from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import './Table.scss';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const TableTemplate = ({ employees, openEditForm, deleteEmployee }) => {
  const columns = React.useMemo(
    () => [
      {
        columns: [
          { Header: 'ID', accessor: 'id', show: false },
          {
            Header: () => <div>Colour</div>,
            accessor: 'colour',
            maxWidth: 70,
            Cell: ({ value }) => (
              <div
                style={{
                    background: value,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    marginLeft: 20,
                    marginTop: 5,
                  }}
              />
              ),
          },
          {
            Header: () => <div className="header">Name</div>,
            accessor: 'firstName',
            minWidth: 100,
            maxWidth: 150,
          },
          {
            Header: () => <div className="header">Email</div>,
            accessor: 'email',
            minWidth: 200,
            maxWidth: 210,
          },
          {
            Header: () => <div className="header">Mobile</div>,
            accessor: 'mobile',
          },
          {
            Header: () => <div className="header">Is Certificated</div>,
            id: 'certificated',
            accessor: (d) => (d.certificated ? 'Yes' : 'No'),
          },
          {
            Header: () => <div className="header">TFN</div>,
            accessor: 'tfn',
          },
          {
            Header: () => <div className="header">Super Number</div>,
            accessor: 'superNumber',
          },
          {
            Header: () => <div className="header">Is Available</div>,
            id: 'available',
            accessor: (d) => (d.available ? 'Yes' : 'No'),
          },

          {
            Header: () => <div className="header">Salary</div>,
            accessor: 'salary',
          },
          {
            Header: 'Actions',
            id: 'actions',
            minWidth: 150,
            maxWidth: 200,
            Cell: ({ row }) => (
              <Box textAlign="center" display="flex" justifyContent="space-around">
                <Button variant="contained" color="primary" onClick={() => openEditForm(row.id)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteEmployee(row.id)}
                >
                  Delete
                </Button>
              </Box>
              ),
          },
        ],
      },
    ],
    [],
  );

  return (
    <ReactTable
      className="-striped -highlight"
      data={employees}
      columns={columns}
      defaultPageSize={10}
      style={{
        borderColor: '#a5a4a4',
        borderRadius: '5px',
        borderStyle: 'outset',
      }}
    />
  );
};

export default TableTemplate;
