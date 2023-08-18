import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TextField, Button, Container, Typography, Box  } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';

const Add = () => {
  const [username, setUsername] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [dob, setDob] = useState('');
  const [mobileno, setMobileNo] = useState('');

  const[countrydata,setCountrydata] = useState("")
  const[statedata,setStatedata] = useState("")
  const[citydata,setCitydata] = useState("")

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState("");

  const [usernameError, setUsernameError] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');

  const [token, setToken] = useState(localStorage.getItem('userToken') || ''); // Initialize with token from local storage if available

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const navigate = useNavigate();

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
  const validateMobileNo = (value) => {
    if (!value.match(/^[0-9]{10}$/)) {
      setMobileNoError('Mobile Number must be a 10-digit number!');
    } else {
      setMobileNoError('');
    }
  };

  const handleCountryChange = (e) => {
    const parsedValue = JSON.parse(e.target.value);
    console.log("Parsed Value for Country:", parsedValue.name);
    setSelectedCountry(parsedValue);
    setCountrydata(parsedValue.name);
  };

  const handleStateChange = (e) => {
    const parsedValue = JSON.parse(e.target.value);
    console.log("Parsed Value for State:", parsedValue.name);
    setSelectedState(parsedValue);
    setStatedata(parsedValue.name);
  };

  const handleCityChange = (e) => {
    const parsedValue = JSON.parse(e.target.value);
    console.log("Parsed Value for City:", parsedValue.name);
    setSelectedCity(parsedValue);
    setCitydata(parsedValue.name);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    validateUsername(username);
    validateFname(fname);
    validateLname(lname);
    validateMobileNo(mobileno);
  
    if(!checked) {
      setCheckedError("please checked a box")
      return;
    } else {
      setCheckedError("");
    }

    try {
      const formData = new FormData();
      formData.append('countrydata', countrydata);
      formData.append('statedata', statedata);
      formData.append('citydata', citydata);
      formData.append('username', username);
      formData.append('fname', fname);
      formData.append('lname', lname);
      formData.append('password', password);
      formData.append('image', image);
      formData.append('dob', dob);
      formData.append('mobileno', mobileno);
      formData.append('checked', checked);
      
      const response = await axios.post('http://localhost:5000/api/form', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      setUsername('');
      setFname('');
      setLname('');
      setPassword('');
      setImage(null);
      setDob('');
      setMobileNo('');
      setChecked("")
      alert('Form submitted successfully!');
      const receivedToken = response.data.token; // Assuming the server sends the token in the response
      localStorage.setItem('token', receivedToken); // Store the token in local storage
      setToken(receivedToken); 
      navigate('/protected');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Form submission failed!');
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

  const handleChangeChecked = (event) => {
  setChecked(event.target.checked)
  }
  return (
    <div>
      {token ? (
           
    <Container maxWidth="sm">
    <Typography variant="h4" component="h4">
      Registration Form 
      <Box my={2} />
    </Typography>
    <form onSubmit={handleSubmit}>
   
    <div>
    <FormControl style={{width:"50%", display:"flex"}}>
      <InputLabel>Select Country</InputLabel>
      <Select
        value={selectedCountry ? JSON.stringify(selectedCountry) : ''}
        onChange={handleCountryChange}
      >
        <MenuItem value="">Select a country</MenuItem>
        {countries.map(country => (
          <MenuItem key={country.id} value={JSON.stringify(country)}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Box my={1} />
    <FormControl style={{width:"50%", display:"flex"}}>
      <InputLabel>Select State</InputLabel>
      <Select
        value={selectedState ? JSON.stringify(selectedState) : ''}
        onChange={handleStateChange}
        disabled={!selectedCountry}
      >
        <MenuItem value="">Select a state</MenuItem>
        {states.map(state => (
          <MenuItem key={state.id} value={JSON.stringify(state)}>
            {state.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Box my={1} />
    <FormControl style={{width:"50%", display:"flex"}}>
      <InputLabel>Select City</InputLabel>
      <Select
        value={selectedCity ? JSON.stringify(selectedCity) : ''}
        onChange={handleCityChange}
        disabled={!selectedState}
      >
        <MenuItem value="">Select a city</MenuItem>
        {cities.map(city => (
          <MenuItem key={city.id} value={JSON.stringify(city)}>
            {city.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>

    <Box my={1} />
      <TextField
        label="Username"
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          validateUsername(e.target.value);
        }}
        required
        fullWidth
      />
      {usernameError && <Typography style={{ color: 'red' }}>{usernameError}</Typography>}

      <Box my={1} />
      <TextField
        label="First Name"
        type="text"
        name="fname"
        value={fname}
        onChange={(e) => {
          setFname(e.target.value);
          validateFname(e.target.value);
        }}
        required
        fullWidth
      />
      {fnameError && <Typography style={{ color: 'red' }}>{fnameError}</Typography>}

      <Box my={1} />
      <TextField
        label="Last Name"
        type="text"
        name="lname"
        value={lname}
        onChange={(e) => {
          setLname(e.target.value);
          validateLname(e.target.value);
        }}
        required
        fullWidth
      />
      {lnameError && <Typography style={{ color: 'red' }}>{lnameError}</Typography>}

      <Box my={1} />
      <TextField
        label="Password"
        type="password"
        name="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
  <div style={{ border: '1px solid  #ccc', padding: '10px', marginTop:'5px' }}>
        <label>Upload Image:</label>
        <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />
      </div>

      

      <Box my={2} />
      <TextField
        label="Date of Birth"
        type="date"
        name="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />

      <Box my={1} />
      <TextField
        label="Mobile Number"
        type="tel"
        value={mobileno}
        onChange={(e) => {
          setMobileNo(e.target.value);
          validateMobileNo(e.target.value);
        }}
        pattern="[0-9]{10}"
        required
        fullWidth
      />
      {mobileNoError && <Typography style={{ color: 'red' }}>{mobileNoError}</Typography>}
      <Checkbox
      value={checked}
    checked={checked}
    onChange={handleChangeChecked}
    inputProps={{ 'aria-label': 'controlled' }}
  /> i agree with submit form.
   {checkedError && <Typography style={{ color: 'red' }}>{checkedError}</Typography>}

      <Box my={1} display="flex" justifyContent="center">

      <Button style={{marginRight:"10px"}} type="submit" variant="contained" color="primary">
        Register
      </Button>
      <Link to="/protected"> <Button  variant="contained" color="primary">
        Cancel
      </Button>
      </Link>
      </Box>
    </form>
  </Container>
      ) : (
        <h2>Authentication Required</h2>
      )}
    
      
    </div>
  );
};


    
  
export default Add;
