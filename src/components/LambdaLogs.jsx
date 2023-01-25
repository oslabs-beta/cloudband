import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const columns = [
  {
    id: 'timestamp',
    label: 'TimeStamp',
    minWidth: 270,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'message',
    label: 'Logs',
    minWidth: 400,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const LambdaLogsTable = (props) => {
  const { logs } = props;

  const formattedLogs = logs.map((log) => {
    const message = log.message;
    const date = new Date(log.timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }

    return {
      message,
      timestamp: `${month}/${day} ${hour}:${minute}`,
    };
  });
  const rows = formattedLogs;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        color: 'rgba(3, 41, 62, 0.5)',
        backgroundColor: '#f5f5f5',
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Typography
          sx={{
            flex: '1 1 100%',
            textAlign: 'left',
            marginTop: '10px',
            fontWeight: 'bold',
            fontSize: 18,
            paddingLeft: 10,
            paddingBottom: 2,
          }}
          variant="h4"
          id="tableTitle"
          component="h4"
        >
          Logs
        </Typography>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    color: 'rgba(3, 41, 62, 0.5)',
                    backgroundColor: '#f5f5f5',
                    paddingLeft: 10,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            color: 'rgba(3, 41, 62, 0.5)',
                            backgroundColor: '#f5f5f5',
                            paddingLeft: 10,
                          }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: 'rgba(3, 41, 62, 0.5)',
          backgroundColor: '#f5f5f5',
          paddingLeft: 10,
        }}
      />
    </Paper>
  );
};

export default LambdaLogsTable;
