import React ,{useContext, useState} from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import {Toolbar,Typography,Paper,Checkbox} from '@mui/material';
import {Table, TableHead,TableBody,TableCell,TableContainer,TablePagination,TableRow,TableSortLabel} from '@mui/material';
import FormatLineSpacingSharpIcon from '@mui/icons-material/FormatLineSpacingSharp';
import {infoContext} from './DefaultLayout';
import config from '../config.json'
import axios from 'axios';

function createData(DOB,NIC,Name,Address,FatherAddress,FatherName,Occupation,Religion,Sex){
  return {DOB,NIC,Name,Address,FatherAddress,FatherName,Occupation,Religion,Sex};
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {id: 'Name',numeric: false,disablePadding: false,label: 'Name'},
  {id: 'NIC',numeric: false,disablePadding: false,label: 'NIC',},
  {id: 'Address',numeric: false,disablePadding: false,label: 'Address'},
  {id: 'Sex',numeric: false,disablePadding: false,label: 'Sex'},
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
 
  onRequestSort: PropTypes.func.isRequired,
 
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { selected, dense, handleChangeDense } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(!JSON.stringify(selected[0])==='{}' && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {!JSON.stringify(selected[0])==='{}' ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          1 selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Requests
        </Typography>
      )}
      <Checkbox
        checked={dense} onChange={handleChangeDense}
        icon={<FormatLineSpacingSharpIcon/>}
        checkedIcon={<FormatLineSpacingSharpIcon/>}
      />
    </Toolbar>
  );
}

export default function EnhancedTable({selected,setSelected}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const info = useContext(infoContext);

  

  React.useEffect(()=>{
    
    axios.get(`${config.url}/all-requests/${info.gramaDiv}`, {
      headers: {
        Authorization: `Bearer ${info.access_token}`
      }
    })
    .then(function (response) {
      var data = []
      for(var i=0; i<response.data.data.persons.length;i++){
        var user = response.data.data.persons[i]
        data.push(createData(user.DOB,user.NIC,user.Name,user.address,user.fatherAddress
          ,user.fatherName, user.occupation,user.religion,user.sex))
      }
      setRows(data)
      console.log(response.data.data.persons)
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])
    

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = [row];
    } else if (selectedIndex === 0) {
      newSelected = [{}];
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (Name) => selected.indexOf(Name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar selected={selected} dense={dense} handleChangeDense={handleChangeDense} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.NIC}
                      selected={isItemSelected}
                    >
                      <TableCell align="left">{row.Name}</TableCell>
                      <TableCell align="left">{row.NIC}</TableCell>
                      <TableCell align="left">{row.Address}</TableCell>
                      <TableCell align="left">{row.Sex}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}