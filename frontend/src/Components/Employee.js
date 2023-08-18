import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow'
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';


const Employee = () => {
  const [data, setData] = useState([]);
  const [editedPerson, setEditedPerson] = useState({});
  const [editedPersonData, setEditedPersonData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");


  const [usernameError, setUsernameError] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const[countrydata,setCountrydata] = useState("")
  const[statedata ,setStatedata] = useState("")
  const[citydata,setCitydata] = useState("")

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  const [sortOrder, setSortOrder] = useState('asc');
  const [lnameSortOrder, setLnameSortOrder] = useState('asc');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const validateUsername = (value) => {
    if (!value.match(/^[A-Za-z]/)) {
      setUsernameError('Username must start with a letter!');
    } else {
      setUsernameError('');
    }
  };
  const validateFname = (value) => {
    if (!value.match(/^[A-Za-z]+$/)) {
      setFnameError('Only letters are allowed!');
    } else {
      setFnameError('');
    }
  };
  const validateLname = (value) => {
    if (!value.match(/^[A-Za-z]+$/)) {
      setLnameError('Only letters are allowed!');
    } else {
      setLnameError('');
    }
  };
  const validatePassword = (value) => {
    if (!value.match(/^[0-9]{1,}$/)) {
      setPasswordError('only Number ')
    } else {
      setPasswordError('');
    }
  };
  const validateMobileNo = (value) => {
    if (!value.match(/^[0-9]{10}$/)) {
      setMobileNoError('Mobile Number must be a 10-digit number!');
    } else {
      setMobileNoError('');
    }
  };
  useEffect(() => {

    axios.get('http://localhost:5000/countries') 
      .then(response => setCountries(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios.get(`http://localhost:5000/states/${selectedCountry.id}`)
        .then(response => setStates(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:5000/cities/${selectedState.id}`)
        .then(response => setCities(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedState]);

  const sortDataByFirstName = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.fname.localeCompare(b.fname);
      } else {
        return b.fname.localeCompare(a.fname);
      }
    });
    setData(sortedData);
  };
  useEffect(() => {
    sortDataByFirstName();
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortDataByLastName = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (lnameSortOrder === 'asc') {
        return a.lname.localeCompare(b.lname);
      } else {
        return b.lname.localeCompare(a.lname);
      }
    });
    setData(sortedData);
  };
  useEffect(() => {
    sortDataByLastName();
  }, [lnameSortOrder]);

  const toggleLnameSortOrder = () => {
    setLnameSortOrder(lnameSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const fetchPersonData = () => {
    axios.get("http://localhost:5000/api/form")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    fetchPersonData();
  }, []);

  const handleEdit = (person) => {
    setEditedPerson({ ...person });
    const formattedDate = moment(person.dob, 'YYYY-MM-DD').format('YYYY-MM-DD');

    setSelectedDate(formattedDate);
    setSelectedImage(person.image);
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setCountrydata(person.countrydata);
  setStatedata(person.statedata);
  setCitydata(person.citydata);
    setIsPopupOpen(true);
    setEditedPersonData(person);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true)
  };

  const handleDelete = (personId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this person?");
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/api/form/${personId}`)
        .then(response => {

          setData(prevData => prevData.filter(person => person._id !== personId));
        })
        .catch(error => console.log(error));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  };
  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };
 
  const handleSave = () => {
    const formData = new FormData();
    formData.append('username', editedPerson.username);
    formData.append('fname', editedPerson.fname);
    formData.append('lname', editedPerson.lname);
    formData.append('password', editedPerson.password);
    formData.append('image', selectedImage);
    formData.append('dob', selectedDate);
    formData.append('mobileno', editedPerson.mobileno);
    formData.append('countrydata', countrydata);
    formData.append('statedata', statedata);
    formData.append('citydata', citydata);

    const hasErrors = usernameError || fnameError || lnameError || passwordError || mobileNoError ;
    if (hasErrors) {
      alert('Please fill the required details correctly!');
      return;
    }
    axios
      .put(`http://localhost:5000/api/form/${editedPerson._id}`, formData)
      .then((response) => {
        setOpen(false);
        fetchPersonData();

      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  const handleCountryChange = (event) => {
    const parsedValue = JSON.parse(event.target.value)
    setSelectedCountry(parsedValue);
    setCountrydata(parsedValue.name);
    setSelectedState(null);
    setStatedata(null);
    setSelectedCity(null);
    setCitydata(null);
  };

  const handleStateChange = (event) => {
    const parsedValue = JSON.parse(event.target.value);

    setSelectedState(parsedValue);
    setStatedata(parsedValue.name);
    setSelectedCity(null);
    setCitydata(null);
  };

  const handleCityChange = (event) => {
    const parsedValue = JSON.parse(event.target.value);

    setSelectedCity(parsedValue);
    setCitydata(parsedValue.name);
  };

  return (
    <>
      <h1>Person Table</h1>
          <Dialog open={open} style={{width:"100%"}}>
        <div className="registration-form1">
            <DialogTitle><h2>Edit Person</h2></DialogTitle>
            <DialogContent >
              <Box my={1} />
           
   <div>
      <FormControl  style={{width:"50%", display:"flex"}}>
        <InputLabel>Select Country:</InputLabel>
        <Select value={countrydata} onChange={handleCountryChange}>
          <MenuItem value={countrydata}>{countrydata}</MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id} value={JSON.stringify(country)}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl  style={{width:"50%", display:"flex"}}>
        <InputLabel>Select State:</InputLabel>
        <Select value={statedata} onChange={handleStateChange}>
          <MenuItem value={statedata}>{statedata}</MenuItem>
          {states.map((state) => (
            <MenuItem key={state.id} value={JSON.stringify(state)}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl  style={{width:"50%", display:"flex"}}>
        <InputLabel>Select City:</InputLabel>
        <Select value={citydata} onChange={handleCityChange}>
          <MenuItem value={citydata}>{citydata}</MenuItem>
          {cities.map((city) => (
            <MenuItem key={city.id} value={JSON.stringify(city)}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
      
              <TextField
                margin="dense"
                name="username"
                label="Username:"
                type="text"
                fullWidth
                variant="standard"
                value={editedPerson.username || ""}
                onChange={(e) => { handleInputChange(e); validateUsername(e.target.value); }} />
              {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}

              <TextField
                margin="dense"
                label=" First Name:"
                type="text"
                fullWidth
                variant="standard"
                name="fname"
                value={editedPerson.fname || ""}
                onChange={(e) => { handleInputChange(e); validateFname(e.target.value); }} />
              {fnameError && <p style={{ color: 'red' }}>{fnameError}</p>}

              <TextField
                margin="dense"
                label="  Last Name:"
                type="text"
                fullWidth
                variant="standard"
                name="lname"
                value={editedPerson.lname || ""}
                onChange={(e) => { handleInputChange(e); validateLname(e.target.value); }} />
              {lnameError && <p style={{ color: 'red' }}>{lnameError}</p>}

              <TextField
                margin="dense"
                label=" Password:"
                type="text"
                fullWidth
                variant="standard"
                name="password"
                value={editedPerson.password}
                onChange={(e) => { handleInputChange(e); validatePassword(e.target.value); }} />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

              <TextField
                margin="dense"
                id="outlined-multiline-static"
                label="upload image"
          
                type="file"
                fullWidth
                variant="standard"
                accept="image/*"
                name="image" focused 
                onChange={handleImageUpload} />
              <img style={{ width: "100px" }} src={`http://localhost:3000/resources/${selectedImage}`} />

              <TextField
                margin="dense"
                label=" Date of Birth:"
                type="date"
                fullWidth
                variant="standard"
                name="dob"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)} />

              <TextField
                margin="dense"
                label=" Mobile No:"
                type="text"
                fullWidth
                variant="standard"
                name="mobileno"
                value={editedPerson.mobileno || ""}
                onChange={(e) => {
                  handleInputChange(e); validateMobileNo(e.target.value);
                }} />
              {mobileNoError && <p style={{ color: 'red' }}>{mobileNoError}</p>}
            </DialogContent>
            <DialogActions>

              <div style={{ textAlign: "center", width: "auto", marginTop: "10px" }}>
                <button style={{ width: "auto", marginRight: "10px" }} onClick={handleSave}>
                  Save
                </button>
                <button style={{ width: "auto" }} onClick={() => handleClose(false)}>
                  Cancel
                </button>
              </div>
            </DialogActions>
        </div>
          </Dialog>
  
        <Paper sx={{ width: '100%', margin: "0px", overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                
                  <TableCell>UserName</TableCell>
                  <TableCell>
                    <span onClick={toggleSortOrder}>
                      FirstName {sortOrder === 'asc' ? <>&#9650;</> : <>&#9660;</>}
                    </span>
                  </TableCell>
                  <TableCell><span onClick={toggleLnameSortOrder}>
                    LastName {lnameSortOrder === 'asc' ? <>&#9650;</> : <>&#9660;</>}
                  </span></TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>contry</TableCell>
                  <TableCell>state</TableCell>
                  <TableCell>city</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>MobileNo</TableCell>
                  <TableCell style={{ display: "inline-block" }}>Action</TableCell>
                  <Link to="/Add" className='btn'><Tooltip title="Add User">{<AddIcon />} </Tooltip></Link>
                </TableRow>
              </TableHead>
              <tbody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((person, index) => (
                  <TableRow key={index}>
                    <TableCell >{index + 1}</TableCell >
                
                    <TableCell >{person.username}</TableCell >
                    <TableCell >{person.fname}</TableCell >
                    <TableCell >{person.lname}</TableCell >
                    <TableCell >{person.password}</TableCell >
                    <TableCell >{person.countrydata} </TableCell >
                    <TableCell >{person.statedata}</TableCell >
                    <TableCell >{person.citydata}</TableCell >
                    <TableCell ><img style={{ width: "50px" }} src={`http://localhost:5000/resources/${person.image}`} /></TableCell >
                    <TableCell >{moment(person.dob).format("MMMM Do YYYY")}</TableCell >
                    <TableCell >{person.mobileno}</TableCell >
                    <Button>   <Tooltip title="Edit" onClick={() => handleEdit(person)}>  <EditNoteIcon /> </Tooltip> </Button>
                    <Button onClick={() => handleDelete(person._id)}>  <Tooltip title="Delete">  <DeleteOutlineIcon />  </Tooltip></Button>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
    </>
  );
}
export default Employee;