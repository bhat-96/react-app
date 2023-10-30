import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { TableContainer, Paper, Grid, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import {
  urlGetAllPatients, urlGetPatientDetail, urlAddNewPatient, urlSearchPatientRecord,
  // urlEditPatientById, 
  urlGetAllVisitsToday,
  // urlSearchVisitRecord,
  urlSearchUHID, urlGetDepartmentBasedOnPatitentType, urlGetServiceLocationBasedonId, urlGetProviderBasedOnDepartment,
  // urlAddNewVisit
} from '../../endpoints.ts';
//import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container } from '@mui/system';
import TextField from './FormsUI/Textfield';
import Select from './FormsUI/Select';
import DateTimePicker from './FormsUI/DateTimePicker/index.js';
import Button from './FormsUI/Button/index.js';
//import customButton from './FormsUI/Button/customButton.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomSelect from './FormsUI/CustomSelect';
import { useRef } from 'react';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import Pagination from '@mui/material/Pagination';
import MaterialUIPagination from './FormsUI/MaterialUIPagination/index.js';
import Stack from '@mui/material/Stack';
import PaginationInfo from './FormsUI/PaginationInfo/index.js';
//import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Cancel';
//import parse from 'autosuggest-highlight/parse';


import CustomAutocomplete from './FormsUI/Autocomplete/index.js';
import PatientHeader from './FormsUI/PatientHeader/index.js';
import PatientHeaderVisit from './FormsUI/PatientHeaderVisit/indexvisit.js';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8)
  }
}));
const FORM_VALIDATION = Yup.object().shape({
  PatientFirstName: Yup.string().required('required'),
  PatientMiddleName: Yup.string(),
  PatientLastName: Yup.string().required('required'),
  FatherHusbandName: Yup.string(),
  EmailId: Yup.string().email('invalid email'),
  MobileNumber: Yup.number().integer().typeError('Please enter a valid mobile number').required('required'),
  PermanentAddress1: Yup.string(),
  Occupation: Yup.string(),
  ReligionId: Yup.string(),
  Height: Yup.number().typeError('Please enter valid height in cms'),
  Weight: Yup.number().typeError('Please enter valid Weight in kg'),
  Address: Yup.string(),
  PermanentPinCode: Yup.number(),
  dob: Yup.date().required('required'),
  PatientGender: Yup.string().required('required'),
  title: Yup.string().required('required'),
  PatientType: Yup.string().required('required'),
  Department: Yup.string().required('required'),
  Provider: Yup.string().required('required'),
  ServiceLocation: Yup.string().required('required'),
  //country: Yup.string().required('required'),
});


const containsDropdown = {
  1: 'Starts With',
  2: 'Ends With',
  3: 'Sounds Like',
  4: 'Anywhere'
}
// const patientTypes = {
//   22: 'Obstetrics & Gynaecology (OBGYN)',
//   23: 'IP',
//   24: 'DC',
//   25: 'EM'
// }

const identifierType = {
  //1: 'Aadhar Card',
}
export default function Patient() {
  const [patientDetails, setPatientDetails] = useState([]);
  const [patientsearchDetails, setPatientSearchDetails] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState('1');
  //  const [anchorEl, setAnchorEl] = useState(null);
  //  const [selectedRowData, setSelectedRowData] = useState(null);
  //const [visitDetails, setVisitDetails] = useState([]);

  // const [patientTypes, setPatientTypes] = useState([]);
  ////  const [titlekin, settitlekin] = useState([]);
  //  const [visittypes, setvisittypes] = useState([]);
  //  const [visitReason, setVisitReason] = useState([]);
  // const [referral, setReferral] = useState([]);

  //const [patientdata, setpatientdata] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [providers, setProviders] = useState([]);
  const [serviceLocations, setServiceLocations] = useState([]);

  const [selectedPatientType, setSelectedPatientType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedServiceLocation, setSelectedServiceLocation] = useState('');
  //const [patientdata, setPatientdata] = useState(null);
  const [encounterId, setEncounterId] = useState(null); // Initialize with null or default value
  //const [apiData, setApiData] = useState(null);
  const [initialFormState, setInitialFormState] = useState({
    PatientFirstName: '',
    PatientMiddleName: '',
    PatientLastName: '',
    FatherHusbandName: '',
    Height: '',
    Weight: '',
    PermanentAddress1: '',
    PermanentPinCode: '',
    MobileNumber: '',
    EmailId: '',
    Occupation: '',
    ReligionId: '',
    country: '',
    state: '',
    city: '',
    dob: '',
    check: '',
    title: '',
    PatientGender: '',
    MaritalStatus: '',
    PermanentStateId: '',
    PermanentPlaceId: '',
    PermanentAreaId: '',
    PatientType: '',
    Department: '',
    Provider: '',
    ServiceLocation: '',

  });

  const [initialFormState1, setInitialFormState1] = useState({
    PatientName: '',
    Uhid: '',
    MobileNumber: '',
    Age: '',
    Gender: '',
    IdentifierType: '',
    IdentifierTypeValue: '',
    RegistrationFrom: '',
    RegistrationTo: '',
    City: '',
    DateOfBirth: '',
    NameFilter: ''
  });
  // const [initialFormState2, setInitialFormState2] = useState({
  //   PatientName: '',
  //   Uhid: '',
  //   PatientType: '',
  //   RegistrationFrom: '',
  //   RegistrationTo: '',
  // });



  // const handleResetFormInitialFormState2 = () => {
  //   setInitialFormState2({
  //     PatientName: '',
  //     Uhid: '',
  //     PatientType: '',
  //     RegistrationFrom: '',
  //     RegistrationTo: '',
  //   });
  // };
  const [patientDropdown, setPatientDropdown] = useState({
    Title: [],
    Gender: [],
    BloodGroup: [],
    MaritalStatus: [],
    Countries: [],
    Statesnew: [],
    PatientType: [],
    KinTitle: [],
    VisitType: []
    // Ensure this is initialized
    // Other properties...
  });



  const handleResetFormInitialFormState = () => {

    setInitialFormState({
      PatientFirstName: '', // Set your default value for each field here
      PatientMiddleName: '',
      PatientLastName: '',
      FatherHusbandName: '',
      Height: '',
      Weight: '',
      PermanentAddress1: '',
      PermanentPinCode: '',
      MobileNumber: '',
      EmailId: '',
      Occupation: '',
      ReligionId: '',
      country: '',
      state: '',
      city: '',
      dob: '',
      check: '',
      title: '',
      PatientGender: '',
      MaritalStatus: '',
      PermanentStateId: '',
      PermanentPlaceId: '',
      PermanentAreaId: '',
      PatientType: '',
      Department: '',
      Provider: '',
      ServiceLocation: '',
    });
    // Reset any other state variables related to the form
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
  };

  const handleResetFormInitialFormState1 = () => {

    setInitialFormState1({
      PatientName: '',
      Uhid: '',
      MobileNumber: '',
      Age: '',
      Gender: '',
      IdentifierType: '',
      IdentifierTypeValue: '',
      RegistrationFrom: '',
      RegistrationTo: '',
      City: '',
      DateOfBirth: '',
      NameFilter: ''
    });
  };






  const handleChange = (event, newValue) => {

    setValue(newValue);
    // Reset the selected row data when switching to TabPanel1
    if (newValue === '1') {
      //setSelectedRowData(null);
      handleResetFormInitialFormState();
      handleResetFormInitialFormState1();
      handleResetFormInitialFormState2();
      setSelectedCountry('');
      setSelectedState('');
      setSelectedCity('');
      // handleMenuClose(); // Close the menu
      setSelectedUhId(null);
      loadPatients();
      //setPatientdata(null);
    }
    else if (newValue === '2') {
      handleResetFormInitialFormState(); // Call the custom reset function
      handleResetFormInitialFormState1();
      handleResetFormInitialFormState2();
      setSelectedCountry('');
      setSelectedState('');
      setSelectedCity('');
      setSelectedUhId(null);
      //  setPatientdata(null);
      // handleMenuClose();

    }
    else {
      handleResetFormInitialFormState();
      handleResetFormInitialFormState1();
      handleResetFormInitialFormState2(); // Call the custom reset function
      setSelectedCountry('');
      setSelectedState('');
      setSelectedCity('');
      setSelectedUhId(null);
      //setPatientdata(null);
    }
  };

  useEffect(() => {
    debugger;
    axios.get(urlGetAllPatients).then((response) => {
      setPatientDetails(response.data.data.Patients);
    });
  }, []);
  // useEffect(() => {
  //   //debugger;
  //   axios.get(urlGetAllVisitsToday).then((response) => {
  //     setVisitDetails(response.data.data.EncounterModelList);
  //   });
  // }, []);

  useEffect(() => {
    //const urlGetPatientDetail = 'YOUR_API_ENDPOINT_HERE'; // Replace with your API endpoint
    axios.get(urlGetPatientDetail).then((response) => {
      const apiData = response.data.data; // Assuming your API response structure matches the provided data
      setPatientDropdown(apiData);
      //  console.log(apiData);
    });
  }, []);

  // const handleMenuClick = (event, params) => {
  //   setAnchorEl(event.currentTarget); // Open the menu at the click position
  //   setSelectedRowData(params.row); // Store the selected row data // Store the selected row data
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null); // Close the menu
  //   setSelectedRowData(null);
  // };
  // const formatDateToYYYYMMDD = (dateString) => {
  //   // Convert the date to the 'yyyy-MM-dd' format
  //   const date = new Date(dateString);
  //   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  // };

  // const fetchData = async (patientId) => {

  //   try {
  //     const response = await axios.get(`${urlEditPatientById}?PatientId=${patientId}`);
  //     if (response.status === 200) {
  //       const data = response.data.data.PatientDetail;
  //       //setApiData(data); // Update the state with the fetched data

  //       // Update the form's initial values with the data from the API response
  //       const updatedInitialValues = {
  //         PatientFirstName: data.PatientFirstName || '',
  //         PatientMiddleName: data.PatientMiddleName || '',
  //         PatientLastName: data.PatientLastName || '',
  //         FatherHusbandName: data.FatherHusbandName || '',
  //         MobileNumber: data.MobileNumber || '',
  //         ReligionId: data.ReligionId || '',
  //         country: data.PresentCountryId || '',
  //         state: data.PresentStateId || '',
  //         city: data.PresentPlaceId || '',
  //         dob: data ? formatDateToYYYYMMDD(data.DateOfBirth) : '', // Convert the date format here,
  //         check: data || '',
  //         title: data.PatientTitle || '',
  //         PatientGender: data.Gender || '',
  //         MaritalStatus: data.MaritalStatus || '',
  //       };

  //       // setApiData(data); // Update the state with the fetched data
  //       setInitialFormState(updatedInitialValues); // Set the form's initial values
  //       setValue("2");
  //       // Perform actions with the selected row data, e.g., navigate to a new tab
  //       console.log('Selected row data:', selectedRowData);
  //       // After performing the edit action, clear selectedRowData

  //     } else {
  //       console.error('Failed to fetch data from the API');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // const handleEditClick = () => {
  //   //debugger;
  //   //const selectedRowData = params.row;
  //   //setSelectedRowData(params.row); // Store the selected row data
  //   // Update the form's initial values with the data from the selected row
  //   console.log("Edit clicked, Selected Row Data:", selectedRowData);

  //   if (selectedRowData && selectedRowData.PatientId) {
  //     const patientId = selectedRowData.PatientId;
  //     fetchData(patientId);
  //   } else {
  //     console.error('Selected row data or PatientId is missing');
  //   }
  // };

  // const handleCreateVisitClick = () => {
  //   //debugger;
  //   //const selectedRowData = params.row;
  //   //setSelectedRowData(params.row); // Store the selected row data
  //   // Update the form's initial values with the data from the selected row
  //   console.log("Edit clicked, Selected Row Data:", selectedRowData);

  //   if (selectedRowData && selectedRowData.PatientId) {
  //     const patientId = selectedRowData.PatientId;
  //     fetchPatientDetails(patientId);
  //   } else {
  //     console.error('Selected row data or PatientId is missing');
  //   }
  // };
  // // Function to fetch patient details based on patient ID
  // const fetchPatientDetails = async (patientId) => {

  //   try {
  //     // Make an API call to fetch patient details using patientId
  //     const response = await axios.get(`${urlGetVisitDetailsWithPHeader}?PatientId=${patientId}`);
  //     if (response.status === 200) {
  //       const headerdata = response.data.data.PatientDetail;
  //       const pttype = response.data.data.PatientType;
  //       const titlekin = response.data.data.KinTitle;
  //       const visittypes = response.data.data.VisitType;
  //       const reason = response.data.data.VisitReason;
  //       const refer = response.data.data.Referral;

  //       setPatientdata(headerdata);
  //       setEncounterId(headerdata.EncounterId);
  //       // Assuming your API response structure matches the provided data
  //       setPatientTypes(pttype);
  //       settitlekin(titlekin);
  //       setvisittypes(visittypes);
  //       setVisitReason(reason);
  //       setReferral(refer);

  //       setValue("4");
  //     } else {
  //       console.error('Failed to fetch patient details');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching patient details:', error);
  //   }
  // };
  useEffect(() => {
    if (selectedPatientType) {
      fetchDept(selectedPatientType);

    } else {
      // Reset the department dropdown if no patient type is selected
      setDepartments([]);
      setSelectedDepartment('');
    }
  }, [selectedPatientType]);

  const fetchDept = async (selectedPatientType) => {

    try {
      // Make an API call to fetch patient details using patientId
      const response = await axios.get(`${urlGetDepartmentBasedOnPatitentType}?PatientType=${selectedPatientType}`);
      if (response.status === 200) {
        const dept = response.data.data.Department;
        setDepartments(dept);
      } else {
        console.error('Failed to fetch patient details');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  useEffect(() => {
    // Fetch data for the "provider" and "servicelocation" dropdowns when "selectedDepartment" changes
    if (selectedDepartment) {


      fetchProvider(selectedDepartment);
      fetchServicelocation(selectedDepartment, selectedPatientType);

      // axios.get(`${urlGetProviderBasedOnDepartment}?DepartmentId=${selectedDepartment}`)
      //   .then((data) => setProviders(data.Provider))
      //   .catch((error) => console.error('Error fetching providers:', error));

      // axios.get(`${urlGetServiceLocationBasedonId}?DepartmentId=${selectedDepartment}?patienttype=${selectedPatientType}`)
      //   .then((data) => setServiceLocations(data.ServiceLocation))
      //   .catch((error) => console.error('Error fetching service locations:', error));
    } else {
      // Reset the provider and servicelocation dropdowns if no department is selected
      setProviders([]);
      setServiceLocations([]);
      setSelectedProvider('');
      setSelectedServiceLocation('');
    }
  }, [selectedDepartment]);

  const fetchProvider = async (selectedDepartment) => {
    debugger;
    try {
      // Make an API call to fetch patient details using patientId
      const response = await axios.get(`${urlGetProviderBasedOnDepartment}?DepartmentId=${selectedDepartment}`);
      if (response.status === 200) {
        const provider = response.data.data.Provider;
        setProviders(provider);
      } else {
        console.error('Failed to fetch patient details');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };
  const fetchServicelocation = async (selectedDepartment, selectedPatientType) => {

    try {
      // Make an API call to fetch patient details using patientId
      const response = await axios.get(`${urlGetServiceLocationBasedonId}?DepartmentId=${selectedDepartment}&patienttype=${selectedPatientType}`);
      if (response.status === 200) {
        const serviceloc = response.data.data.ServiceLocation;
        setServiceLocations(serviceloc);
      } else {
        console.error('Failed to fetch patient details');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };
  const handleCountryChange = (newCountry) => {
    setSelectedCountry(newCountry);
    setSelectedState('');
    setSelectedCity('');
    // Filter states based on the selected country
    const statesForCountry = patientDropdown.Statesnew.filter((state) => state.CountryId === newCountry);
    setFilteredStates(statesForCountry);
    setFilteredCities([]); // Clear the city dropdown
  };
  // Handle state change
  const handleStateChange = (newState) => {
    setSelectedState(newState);
    setSelectedCity('');
    // Filter cities based on the selected state
    const citiesForState = patientDropdown.Placenew.filter((city) => city.StateId === newState);
    setFilteredCities(citiesForState);

  };


  // const columns = [
  //   { field: 'PatientId', headerName: 'PatientId', flex: 1 },
  //   { field: 'UhId', headerName: 'UHID', flex: 1 },
  //   { field: 'PatientFirstName', headerName: 'Name', flex: 1 },
  //   { field: 'MobileNumber', headerName: 'MobileNumber', flex: 1 },
  //   {
  //     field: 'action',
  //     headerName: 'Action',
  //     flex: 0.5,
  //     renderCell: (params) => (
  //       <IconButton
  //         aria-label="actions"
  //         aria-controls={`action-menu-${params.id}`}
  //         aria-haspopup="true"
  //         onClick={(event) => handleMenuClick(event, params)}
  //       >
  //         <MoreVertIcon />
  //       </IconButton>
  //     ),
  //   },
  // ];
  // const renderDepartmentCell = (params) => {
  //   const { value } = params;

  //   // Define the color for the "General" department, and use "secondary" for others
  //   const chipColor = value === 'General Medicine' ? 'secondary' : 'error';

  //   return (
  //     <Chip label={value} size="small" color={chipColor} />
  //   );
  // };
  // const columnsVisits = [
  //   { field: 'UhId', headerName: 'UHID', flex: 1 },
  //   { field: 'GeneratedEncounterId', headerName: 'VisitId', flex: 1 },
  //   { field: 'PatientName', headerName: 'PatientName', flex: 1 },
  //   { field: 'DepartmentName', headerName: 'Department', flex: 1, renderCell: renderDepartmentCell },
  //   { field: 'ServiceLocationName', headerName: 'ServiceLocation', flex: 1 },
  //   { field: 'ProviderName', headerName: 'ProviderName', flex: 1 },
  //   {
  //     field: 'action',
  //     headerName: 'Action',
  //     flex: 0.5,
  //     renderCell: (params) => (
  //       <IconButton
  //         aria-label="actions"
  //         aria-controls={`action-menu-${params.id}`}
  //         aria-haspopup="true"
  //         onClick={(event) => handleMenuClick(event, params)}
  //       >
  //         <MoreVertIcon />
  //       </IconButton>
  //     ),
  //   },
  // ];

  //const [selectedUhId, setSelectedUhId] = useState('');
  // Submit handler
  const [selectedUhId, setSelectedUhId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const handleSubmit = (values) => {

    // Handle form submission logic here
    console.log('Form submitted with values:', values);

    console.log('Form Values:', values);
    const uhid = selectedUhId ? selectedUhId.UhId : '';
    // ... Repeat for other parameters
    try {
      // Assuming postData1 is an object with your input values
      const postData1 = {
        Uhid: uhid === '' ? '""' : uhid, // Set to empty string when left blank
        NameFilter: values.NameFilter === '' ? '' : values.NameFilter,
        PatientName: values.PatientName === '' ? '""' : values.PatientName,
        DateOfBirth: values.DateOfBirth === '' ? '""' : values.DateOfBirth,
        RegistrationFrom: values.RegistrationFrom === '' ? '""' : values.RegistrationFrom,
        RegistrationTo: values.RegistrationTo === '' ? '""' : values.RegistrationTo,
        Age: values.Age === '' ? '' : values.Age, // A sample value
        Gender: values.Gender === '' ? '' : values.Gender, // A sample value
        MobileNumber: values.MobileNumber === '' ? '""' : values.MobileNumber,
        City: values.City === '' ? '""' : values.City,
        identifierType: values.IdentifierType === '' ? '' : values.IdentifierType,
        IdentifierTypeValue: values.IdentifierTypeValue === '' ? '""' : values.IdentifierTypeValue,
      };
      axios.get(`${urlSearchPatientRecord}?Uhid=${postData1.Uhid}&NameFilter=${postData1.NameFilter}&PatientName=${postData1.PatientName}&DateOfBirth=${postData1.DateOfBirth}&RegistrationFrom=${postData1.RegistrationFrom}&RegistrationTo=${postData1.RegistrationTo}&Age=${postData1.Age}&Gender=${postData1.Gender}&MobileNumber=${postData1.MobileNumber}&City=${postData1.City}&IdentifierType=${postData1.identifierType}&IdentifierTypeValue=${postData1.IdentifierTypeValue}`, null,
        {
          params: postData1,
          headers: {
            'Content-Type': 'application/json', // Replace with the appropriate content type if needed
          },
        })
        .then(response => {
          console.log('Response:', response.data);
          //resetForm();
          setPatientSearchDetails(response.data.data.Patients);
          setCurrentPage1(1);

        })

    } catch (error) {
      // Handle any errors here
      console.error('Error:', error);

    }
  };

  // const handleSubmit1 = (values) => {

  //   // Handle form submission logic here
  //   console.log('ENcounterForm submitted with values:', values);
  //   // ... Repeat for other parameters
  //   try {
  //     // Assuming postData1 is an object with your input values
  //     const postData2 = {
  //       PatientType: values.PatientTypeSearch === '' ? '' : values.PatientTypeSearch,
  //       Uhid: values.Uhid === '' ? '""' : values.Uhid, // Set to empty string when left blank
  //       PatientName: values.PatientName === '' ? '""' : values.PatientName,
  //       RegistrationFrom: values.RegistrationFrom === '' ? '""' : values.RegistrationFrom,
  //       RegistrationTo: values.RegistrationTo === '' ? '""' : values.RegistrationTo,

  //     };
  //     axios.get(`${urlSearchVisitRecord}?PatientType=${postData2.PatientType}&Uhid=${postData2.Uhid}&PatientName=${postData2.PatientName}&RegistrationFrom=${postData2.RegistrationFrom}&RegistrationTo=${postData2.RegistrationTo}`, null,
  //       {
  //         params: postData2,
  //         headers: {
  //           'Content-Type': 'application/json', // Replace with the appropriate content type if needed
  //         },
  //       })
  //       .then(response => {
  //         console.log('Response:', response.data);
  //         //resetForm();
  //         setVisitDetails(response.data.data.EncounterModelList);

  //       })

  //   } catch (error) {
  //     // Handle any errors here
  //     console.error('Error:', error);

  //   }
  // };
  // Create a ref for the Formik component
  const formikRef = useRef(null);
  const formikRef1 = useRef(null);
  const loadPatients = () => {
    axios.get(urlGetAllPatients).then((response) => {
      setPatientDetails(response.data.data.Patients);
    });
  };
  const loadvisits = () => {
    axios.get(urlGetAllVisitsToday).then((response) => {
      setVisitDetails(response.data.data.EncounterModelList);
    });
  };


  const handleClearForm = (event) => {
    if (event) {
      event.preventDefault();
    }
    setSelectedUhId(null); // Reset the selected value to null
    //setInputUhidValue(''); // Reset the input value
    //setSelectedUhId('');
    // setSelectedOption(null); // Clear the selected option
    // Add any other logic to clear other form fields if needed
    loadPatients();
    formikRef.current.resetForm();
  };
  // const handleClearForm1 = () => {
  //   loadvisits();
  //   formikRef1.current.rformikRef1esetForm();
  // };
  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleAutocompleteChange = (newValue) => {
    setSelectedUhId(newValue);
  };

  const fetchOptionsCallback = async (inputValue) => {
    // Fetch options here based on the inputValue

    try {
      const response = await axios.get(`${urlSearchUHID}?Uhid=${inputValue}`);
      if (response.data && Array.isArray(response.data.data)) {
        setOptions(response.data.data);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setOptions([]);
    }
  };

  function formatDate(inputDate) {
    const dateParts = inputDate.split('-');
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      return `${day}-${month}-${year}`;
    }
    return inputDate; // Return as is if not in the expected format
  }


  const [openAddPatientDialog, setOpenAddPatientDialog] = useState(false);
  const [openCreateVisitDialog, setOpenCraeteVisitDialog] = useState(false);


  let shouldCloseDialog = false; // Initialize the condition
  let shouldVisitCloseDialog = false; // Initialize the condition

  const handleOpenAddPatientDialog = () => {
    setOpenAddPatientDialog(true);
  };
  const handleOpenCreateVisitDialog = () => {
    setOpenCraeteVisitDialog(true);
  };

  const handleCustomClose = () => {
    // Set the condition to true when you want to close the dialog
    shouldCloseDialog = true;
    handleCloseAddPatientDialog();
  };

  const handleCustomVisitClose = () => {
    // Set the condition to true when you want to close the dialog
    loadPatients();
    shouldVisitCloseDialog = true;
    handleCloseCreateVisitDialog();
    setSelectedUhId(null);
  };

  const handleCloseAddPatientDialog = () => {
    // Add a condition to check if the dialog should be closed
    if (shouldCloseDialog) {
      setOpenAddPatientDialog(false);
    }
  };

  const handleCloseCreateVisitDialog = () => {
    // Add a condition to check if the dialog should be closed
    if (shouldVisitCloseDialog) {
      setOpenCraeteVisitDialog(false);
      setPatientSearchDetails([]);
    }
  };


  const [currentPage1, setCurrentPage1] = useState(1);
  const [patientsPerPage1] = useState(10); // Number of patients per page


  const indexOfLastPatient = currentPage1 * patientsPerPage1;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage1;
  const currentPatients = patientsearchDetails.slice(indexOfFirstPatient, indexOfLastPatient);

  // const startRange = indexOfFirstPatient + 1;
  // const endRange = Math.min(indexOfLastPatient, patientsearchDetails.length);

  // Calculate the range information
  let startRange = 1;
  let endRange = patientsearchDetails.length;

  if (patientsearchDetails.length > 0) {
    startRange = indexOfFirstPatient + 1;
    endRange = Math.min(indexOfLastPatient, patientsearchDetails.length);
  }
  // Change page
  const onPageChange = (pageNumber) => {
    setCurrentPage1(pageNumber);
  };


  //pagination and x-y of z and totalcountof patient
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');




  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Function to filter patients by name
  const filteredPatients = patientDetails.filter((patient) =>
    patient.PatientFirstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPatients = filteredPatients.length;
  const firstPatientIndex = (currentPage - 1) * patientsPerPage + 1;
  const lastPatientIndex = Math.min(currentPage * patientsPerPage, totalPatients);
  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const totalPatientCountStyle = {
    textAlign: 'center', // Center the text
    marginTop: '10px',   // Adjust the margin as needed
  };
  const searchInputStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    // marginBottom: '5px',
  };


  const classes = useStyles();
  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Patients" value="1" />
              <Tab label="Add Patient" value="2" />


            </TabList>

          </Box>
          <TabPanel value="1">
            <TableContainer component={Paper}>
              <div style={{ width: '100%' }}>
                <div>
                  <Box
                    width={'100%'}
                    height={'80px'}
                    border={2}
                    borderColor="#efebe9"
                    backgroundColor="#eeeeee"
                    borderRadius={4}
                    display="flex"
                   alignItems="center"
                    justifyContent="space-evenly"
                    p={2}
                    mb={2}
                  >
                    <button
                      style={{
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        fontFamily: "'Roboto',sans-serif",
                        fontSize: "0.875rem",
                        lineHeight: "1.75",
                        minWidth: "64px",
                        padding: "6px 16px",
                        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                        width: "48%",
                        fontWeight: "500",
                        borderRadius: "4px",
                        border: "none",
                        marginRight:"900px"
                        
                      }}
                      type="button"
                      onClick={handleOpenAddPatientDialog}
                    >
                      Add Patient
                    </button>

                    <button
                      style={{
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        fontFamily: "'Roboto',sans-serif",
                        fontSize: "0.875rem",
                        lineHeight: "1.75",
                        minWidth: "64px",
                        padding: "6px 16px",
                        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                        width: "48%",
                        fontWeight: "500",
                        borderRadius: "4px",
                        border: "none",
                      }}
                      type="button"
                      onClick={handleOpenCreateVisitDialog}
                    >
                      Visit
                    </button>
                  </Box>
                  <Typography variant="h3">List of Patients VisitsToday</Typography>
                  {/* Display "Showing X-Y of Z" */}
                  <div style={totalPatientCountStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Showing {firstPatientIndex}-{lastPatientIndex} of {totalPatients} Patients
                    </div>
                  </div>

                  {/* Search input */}
                  <div style={searchInputStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Search by patient name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{
                          marginRight: '10px',
                          borderRadius: '5px', // Add border radius
                          padding: '10px 5px', // Add padding
                          border: '3px solid #ccc', // Add border for styling
                        }}
                      />
                    </div>
                  </div>
                  {/* Total patient count centered */}
                  <div>
                    {/* Use a Chip component to display the total patient count. */}
                    {/* Create a container to center the Chip component. */}
                    <Box display="flex" justifyContent="center" marginBottom="5px">
                      <Chip
                        label={`Total Patients: ${filteredPatients.length}`}
                        color="primary" // You can change the color as per your design
                        // variant="outlined" // You can change the variant as per your design
                        style={totalPatientCountStyle}
                      />
                    </Box>

                    {/* ... rest of the component ... */}
                  </div>
                  {filteredPatients
                    .slice((currentPage - 1) * patientsPerPage, currentPage * patientsPerPage)
                    .map((patient, index) => (
                      <PatientHeader key={index} patientdata={patient} encounterId={encounterId} />
                    ))}



                  {/* Pagination */}
                  <Stack direction="row" spacing={2} justifyContent="end">
                    <Pagination
                      count={Math.ceil(filteredPatients.length / patientsPerPage)}
                      page={currentPage}
                      onChange={handleChangePage}
                      color="primary"
                    />
                  </Stack>

                </div>

              </div>
            </TableContainer>

          </TabPanel>
          <TabPanel value="2">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {/* Same as */}
            <ToastContainer />
            <Box sx={{ width: '100%', backgroundColor: 'white', padding: '0' }}>
              <Grid container width={'100%'}>
                <Grid item xs={12}>
                  <Container maxWidth="xlg">
                    <div className={classes.formWrapper}>
                      <Formik
                        initialValues={{ ...initialFormState }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={(values, { resetForm }) => {

                          setLoading(true);
                          console.log(values);
                          const formattedDate = formatDate(values.dob);
                          const postData = {
                            PatientFirstName: values.PatientFirstName,
                            PatientMiddleName: values.PatientMiddleName,
                            PatientLastName: values.PatientLastName,
                            FacilityId: 1,
                            MobileNumber: values.MobileNumber,
                            PatientTitle: values.title,
                            Gender: values.PatientGender,
                            DateOfBirthstring: formattedDate

                          };

                          axios.post(urlAddNewPatient, null,
                            {
                              params: postData,
                              headers: {
                                'Content-Type': 'application/json', // Replace with the appropriate content type if needed
                                // Add any other required headers here
                              },
                            })
                            .then(response => {
                              // Handle the response data here

                              console.log('Response:', response.data);
                              setLoading(false);
                              //alert(JSON.stringify(response.data));
                              if (response.data == true) {
                                // setSuccessToastMessage('Patient registration successful.');

                                toast.success('🦄 Patientregistrationsuccessful', {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "colored",
                                });

                                // handleResetFormInitialFormState(); // Call the custom reset function
                                resetForm(); // Reset the form using Formik's resetForm function
                                // Reset the selectedCountry and selectedState states
                                setSelectedCountry('');
                                setSelectedState('');
                                setSelectedCity('');
                              } else {
                                alert("Invalid Login");
                              }

                            })
                            .catch(error => {
                              // Handle errors here
                              console.error('Error:', error);
                              setLoading(false);
                              //navigate('/error')
                            });


                        }
                        }
                      >
                        <Form>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="h3">Patient Registration</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Select
                                style={{ width: '100%' }} name="title"
                                label={
                                  <span>
                                    Title <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                                  </span>
                                }
                                options={patientDropdown.Title}
                                getOptionLabel={(option) => option.LookupDescription}
                                getOptionValue={(option) => option.LookupID} />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField name="PatientFirstName"
                                label={
                                  <span>
                                    First Name <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                                  </span>
                                }
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField name="PatientMiddleName" label="Middle Name" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField name="PatientLastName"
                                label={
                                  <span>
                                    Last Name<span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                                  </span>
                                }
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Select style={{ width: '100%' }}
                                getOptionLabel={(option) => option.LookupDescription}
                                getOptionValue={(option) => option.LookupID}
                                label={
                                  <span>
                                    Gender <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                                  </span>
                                }
                                name="PatientGender" options={patientDropdown.Gender} />
                            </Grid>
                            {/* <Grid item xs={6} md={3}>
                              <Select style={{ width: '100%' }} name="bggroup" label="Blood Group" options={patientDropdown.BloodGroup} />
                            </Grid> */}
                            <Grid item xs={6} md={3}>
                              <DateTimePicker style={{ width: '100%' }}
                                label={
                                  <span>
                                    Date of Birth <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                                  </span>
                                }
                                name="dob" />
                            </Grid>

                            <Grid item xs={6} md={3}>
                              <TextField name="FatherHusbandName" label="Father / Husband Name" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Select
                                style={{ width: '100%' }}
                                name="MaritalStatus"
                                label="Patient Marital Status"
                                getOptionLabel={(option) => option.LookupDescription}
                                getOptionValue={(option) => option.LookupID}
                                options={patientDropdown.MaritalStatus}
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField
                                name="Height"
                                label="Height"
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">Cms</InputAdornment>
                                }}
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField
                                name="Weight"
                                label="Weight"
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">Kg</InputAdornment>
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Typography variant="h3">Address</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField name="PermanentAddress1" label="Address" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Select
                                name="country"
                                label="country"
                                options={patientDropdown.Countries}
                                getOptionLabel={(option) => option.LookupDescription}
                                getOptionValue={(option) => option.LookupID}
                                onChangeCallback={handleCountryChange}
                                value={selectedCountry || ""}
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Select
                                style={{ width: '100%' }}
                                label="State"
                                options={filteredStates}
                                name="state"
                                getOptionLabel={(option) => option.StateName}
                                getOptionValue={(option) => option.StateID}
                                onChangeCallback={handleStateChange}
                                //onChangeCallback={(newState) => setSelectedState(newState)}
                                value={selectedState || ""} // Ensure that selectedState reflects the user's selection
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Select
                                style={{ width: '100%' }}
                                name="city"
                                label="City"
                                options={filteredCities}
                                getOptionLabel={(option) => option.PlaceName}
                                getOptionValue={(option) => option.PlaceId}
                                // onChange={(event) => setSelectedCity(event.target.value)}
                                onChangeCallback={(newCity) => setSelectedCity(newCity)}
                                value={selectedCity || ""} // Ensure that selectedState reflects the user's selection
                              />

                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField name="PermanentPinCode" label="Pin Code" />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h3">Contact Details</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField name="MobileNumber"
                                label={
                                  <span>
                                    Mobile Number <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                                  </span>
                                }
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField name="EmailId" placeholder="abc@gmail.com" label="Email ID" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextField name="Occupation" label="Occupation" />
                            </Grid>

                            <Grid item xs={6} md={3}>
                              <Select name="ReligionId" style={{ width: '100%' }}
                                getOptionLabel={(option) => option.LookupDescription}
                                getOptionValue={(option) => option.LookupID} label="Religion" options={patientDropdown.Religion} />
                            </Grid>
                            {loading && (
                              <div className="loader-container">
                                <ScaleLoader
                                  color={'#36d646'} loading={loading} css={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100vh' // Make the loader cover the entire viewport height
                                  }} size={150} />
                                {/* <RingLoader color={'#123abc'} loading={loading} css={{ margin: 'auto' }} size={150} /> */}
                              </div>
                            )}
                            <Grid item xs={10}></Grid>
                            <Grid item xs={2} textAlign={'end'}>
                              <Button>Submit</Button>
                            </Grid>
                          </Grid>
                        </Form>
                      </Formik>
                    </div>
                  </Container>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>


        </TabContext>
      </Box >
      <Dialog open={openAddPatientDialog} onClose={handleCloseAddPatientDialog}
        PaperProps={{
          style: {
            maxWidth: '1300px',
            height: '600px' // Set your desired custom max-width here
          }
        }}

      >

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {/* Same as */}
        <ToastContainer />
        <Box sx={{ width: '100%', backgroundColor: 'white', padding: '0' }}>
          <Grid container width={'100%'}>
            <Grid item xs={12}>
              <Container maxWidth="xlg">
                <div className={classes.formWrapper}>
                  <Formik
                    initialValues={{ ...initialFormState }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values, { resetForm }) => {

                      setLoading(true);
                      console.log(values);
                      const formattedDate = formatDate(values.dob);
                      const postData = {
                        PatientFirstName: values.PatientFirstName,
                        PatientMiddleName: values.PatientMiddleName,
                        PatientLastName: values.PatientLastName,
                        FacilityId: 1,
                        MobileNumber: values.MobileNumber,
                        PatientTitle: values.title,
                        Gender: values.PatientGender,
                        DateOfBirthstring: formattedDate,
                        PatientType: values.PatientType,
                        FacilityDepartmentId: values.Department,
                        FacilityDepartmentServiceLocationId: values.ServiceLocation,
                        ProviderId: values.Provider

                      };

                      axios.post(urlAddNewPatient, null,
                        {
                          params: postData,
                          headers: {
                            'Content-Type': 'application/json', // Replace with the appropriate content type if needed
                            // Add any other required headers here
                          },
                        })
                        .then(response => {
                          // Handle the response data here

                          console.log('Response:', response.data);
                          setLoading(false);
                          //alert(JSON.stringify(response.data));
                          if (response.data == true) {
                            // setSuccessToastMessage('Patient registration successful.');

                            toast.success('🦄 Patientregistrationsuccessful', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });

                            // handleResetFormInitialFormState(); // Call the custom reset function
                            resetForm(); // Reset the form using Formik's resetForm function
                            // Reset the selectedCountry and selectedState states
                            setSelectedPatientType('');
                            setSelectedDepartment('');
                            setSelectedServiceLocation('');
                            setSelectedProvider('');
                            setSelectedCountry('');
                            setSelectedState('');
                            setSelectedCity('');
                            setOpenAddPatientDialog(false);
                            loadPatients();
                          } else {
                            alert("Invalid Login");
                          }

                        })
                        .catch(error => {
                          // Handle errors here
                          console.error('Error:', error);
                          setLoading(false);
                          //navigate('/error')
                        });


                    }
                    }
                  >
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>


                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h3" style={{ color: 'blue' }}>Register New Patient</Typography>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <IconButton edge="end" color="inherit" onClick={handleCustomClose}>
                              <CloseIcon />
                            </IconButton>
                          </div>
                          <Typography variant="h3">Patient Details</Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Select
                            style={{ width: '100%' }} name="title"
                            label={
                              <span>
                                Title <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                            options={patientDropdown.Title}
                            getOptionLabel={(option) => option.LookupDescription}
                            getOptionValue={(option) => option.LookupID} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField name="PatientFirstName"
                            label={
                              <span>
                                First Name <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField name="PatientMiddleName" label="Middle Name" />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField name="PatientLastName"
                            label={
                              <span>
                                Last Name<span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Select style={{ width: '100%' }}
                            getOptionLabel={(option) => option.LookupDescription}
                            getOptionValue={(option) => option.LookupID}
                            label={
                              <span>
                                Gender <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                            name="PatientGender" options={patientDropdown.Gender} />
                        </Grid>
                        {/* <Grid item xs={6} md={3}>
                              <Select style={{ width: '100%' }} name="bggroup" label="Blood Group" options={patientDropdown.BloodGroup} />
                            </Grid> */}
                        <Grid item xs={6} md={3}>
                          <DateTimePicker style={{ width: '100%' }}
                            label={
                              <span>
                                Date of Birth <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                            name="dob" />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <TextField name="FatherHusbandName" label="Father / Husband Name" />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Select
                            style={{ width: '100%' }}
                            name="MaritalStatus"
                            label="Patient Marital Status"
                            getOptionLabel={(option) => option.LookupDescription}
                            getOptionValue={(option) => option.LookupID}
                            options={patientDropdown.MaritalStatus}
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField
                            name="Height"
                            label="Height"
                            InputProps={{
                              endAdornment: <InputAdornment position="end">Cms</InputAdornment>
                            }}
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField
                            name="Weight"
                            label="Weight"
                            InputProps={{
                              endAdornment: <InputAdornment position="end">Kg</InputAdornment>
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="h3">Address</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField name="PermanentAddress1" label="Address" />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Select
                            name="country"
                            label="country"
                            options={patientDropdown.Countries}
                            getOptionLabel={(option) => option.LookupDescription}
                            getOptionValue={(option) => option.LookupID}
                            onChangeCallback={handleCountryChange}
                            value={selectedCountry || ""}
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Select

                            style={{ width: '100%' }}
                            label="State"
                            options={filteredStates}
                            name="state"
                            getOptionLabel={(option) => option.StateName}
                            getOptionValue={(option) => option.StateID}
                            onChangeCallback={handleStateChange}
                            //onChangeCallback={(newState) => setSelectedState(newState)}
                            value={selectedState || ""} // Ensure that selectedState reflects the user's selection
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Select
                            style={{ width: '100%' }}
                            name="city"
                            label="City"
                            options={filteredCities}
                            getOptionLabel={(option) => option.PlaceName}
                            getOptionValue={(option) => option.PlaceId}
                            // onChange={(event) => setSelectedCity(event.target.value)}
                            onChangeCallback={(newCity) => setSelectedCity(newCity)}
                            value={selectedCity || ""} // Ensure that selectedState reflects the user's selection
                          />

                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField name="PermanentPinCode" label="Pin Code" />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3">Contact Details</Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField name="MobileNumber"
                            label={
                              <span>
                                Mobile Number <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField name="EmailId" placeholder="abc@gmail.com" label="Email ID" />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField name="Occupation" label="Occupation" />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Select name="ReligionId" style={{ width: '100%' }}
                            getOptionLabel={(option) => option.LookupDescription}
                            getOptionValue={(option) => option.LookupID} label="Religion" options={patientDropdown.Religion} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3">VisitDetails</Typography>
                        </Grid>
                        <Grid item xs={3} md={3}>
                          <Select
                            label={
                              <span>
                                Patient Type <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                            options={patientDropdown.PatientType}
                            name="PatientType"
                            getOptionLabel={(option) => option.LookupDescription}
                            getOptionValue={(option) => option.LookupID}
                            onChangeCallback={setSelectedPatientType}
                            value={selectedPatientType}
                          />
                        </Grid>
                        <Grid item xs={3} md={3}>
                          <Select
                            label={
                              <span>
                                Department  <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                            options={departments}
                            name="Department"
                            getOptionLabel={(option) => option.DepartmentName}
                            getOptionValue={(option) => option.DepartmentId}
                            onChangeCallback={setSelectedDepartment}
                            value={selectedDepartment}
                          />
                        </Grid>
                        <Grid item xs={3} md={3}>
                          <Select
                            label={
                              <span>
                                Provider <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                            options={providers}
                            name="Provider"
                            getOptionLabel={(option) => option.ProviderName}
                            getOptionValue={(option) => option.ProviderId}
                            onChangeCallback={setSelectedProvider}
                            value={selectedProvider}
                          />
                        </Grid>
                        <Grid item xs={3} md={3}>
                          <Select
                            label={
                              <span>
                                Service Location <span style={{ color: 'red', paddingLeft: '2px' }}>*</span>
                              </span>
                            }
                            options={serviceLocations}
                            name="ServiceLocation"
                            getOptionLabel={(option) => option.ServiceLocationName}
                            getOptionValue={(option) => option.FacilityDepartmentServiceLocationId}
                            onChangeCallback={setSelectedServiceLocation}
                            value={selectedServiceLocation}
                          />
                        </Grid>


                        {loading && (
                          <div className="loader-container">
                            <ScaleLoader
                              color={'#36d646'} loading={loading} css={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh' // Make the loader cover the entire viewport height
                              }} size={150} />
                            {/* <RingLoader color={'#123abc'} loading={loading} css={{ margin: 'auto' }} size={150} /> */}
                          </div>
                        )}
                        <Grid item xs={8}></Grid>
                        <Grid item xs={2} textAlign={'end'}>
                          <Button>Submit</Button>
                        </Grid>
                        <Grid item xs={2} justifyContent={'end'}>
                          <button
                            style={{
                              backgroundColor: "#2196F3",
                              color: "#fff",
                              fontFamily: "'Roboto',sans-serif",
                              fontSize: "0.875rem",
                              lineHeight: "1.75",
                              minWidth: "64px",
                              padding: "6px 16px",
                              transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                              boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                              width: "80%",
                              fontWeight: "500",
                              borderRadius: "4px",
                              border: "none",
                            }}
                            type="button"
                            onClick={handleCustomClose}
                          >
                            Cancel
                          </button>
                        </Grid>
                      </Grid>
                    </Form>
                  </Formik>
                </div>
              </Container>
            </Grid>
          </Grid>
        </Box>

      </Dialog>



      <Dialog open={openCreateVisitDialog} onClose={handleCloseCreateVisitDialog} PaperProps={{
        style: {
          maxWidth: '1000px',
          height: '600px' // Set your desired custom max-width here
        },
      }}>

        <Grid container width={'100%'}>
          <Grid item xs={12}>
            <Container maxWidth="xlg">

              <Formik
                initialValues={{ ...initialFormState1 }}
                onSubmit={handleSubmit}
                innerRef={formikRef} // Assign the ref to the Formik component
              >
                {() => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h3">Patient Search</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <IconButton edge="end" color="inherit" onClick={handleCustomVisitClose}>
                            <CloseIcon />
                          </IconButton>
                        </div>

                        {/* <Button onClick={handleAddPatientClick} >Add Patient</Button> */}
                      </Grid>
                      <Grid item xs={6} md={3}>
                        {/* <TextField name="Uhid" label="Uhid" /> */}
                        <CustomAutocomplete
                          id="uhid-autocomplete"
                          label="UHID"
                          options={options}
                          value={selectedUhId}
                          onInputChange={handleInputChange}
                          onChange={handleAutocompleteChange}
                          fetchOptionsCallback={fetchOptionsCallback}
                        />

                      </Grid>
                      <Grid item xs={6} md={3}>
                        <CustomSelect style={{ width: '100%' }} name="NameFilter" label="Contains" options={containsDropdown} />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <TextField name="PatientName" label="Name" />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <DateTimePicker style={{ width: '100%' }} name="DateOfBirth" label="Date of Birth" />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <CustomSelect style={{ width: '100%' }} name="IdentifierType" label="Identifier Type" options={identifierType} />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <TextField name="IdentifierTypeValue" label="Identifier Value" />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <DateTimePicker style={{ width: '100%' }} name="RegistrationFrom" label="Registration From" />
                      </Grid> <Grid item xs={6} md={3}>
                        <DateTimePicker style={{ width: '100%' }} name="RegistrationTo" label="Registration To" />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <TextField name="MobileNumber" label="Mobile Number" />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <TextField name="City" label="City" />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <TextField name="Age" label="Age" />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Select style={{ width: '100%' }}
                          getOptionLabel={(option) => option.LookupDescription}
                          getOptionValue={(option) => option.LookupID}
                          name="Gender" label="Gender" options={patientDropdown.Gender} />
                      </Grid>
                      {/* Repeat the above Field block for other form fields */}
                      <Grid item xs={6}>
                      </Grid>
                      <Grid item xs={2} justifyContent={'end'}>
                        <Button type="submit" style={{ width: '100%' }}>Search</Button>
                      </Grid>
                      <Grid item xs={2} justifyContent={'end'}>
                        <button
                          style={{
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            fontFamily: "'Roboto',sans-serif",
                            fontSize: "0.875rem",
                            lineHeight: "1.75",
                            minWidth: "64px",
                            padding: "6px 16px",
                            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                            width: "100%",
                            fontWeight: "500",
                            borderRadius: "4px",
                            border: "none",
                          }}
                          type="button"
                          onClick={handleClearForm}
                        >
                          Clear
                        </button>
                      </Grid>
                      <Grid item xs={2} justifyContent={'end'}>
                        <button
                          style={{
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            fontFamily: "'Roboto',sans-serif",
                            fontSize: "0.875rem",
                            lineHeight: "1.75",
                            minWidth: "64px",
                            padding: "6px 16px",
                            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                            width: "100%",
                            fontWeight: "500",
                            borderRadius: "4px",
                            border: "none",
                          }}
                          type="button"
                          onClick={handleCustomVisitClose}
                        >
                          Cancel
                        </button>
                      </Grid>
                      {/* Display "Showing X-Y of Z" */}

                    </Grid>

                    {/* Display "Showing X-Y of Z" */}

                    <div style={totalPatientCountStyle}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Showing {firstPatientIndex}-{lastPatientIndex} of {totalPatients} Patients */}
                        <PaginationInfo
                          startRange={startRange}
                          endRange={endRange}
                          totalItems={patientsearchDetails.length}
                        />
                      </div>
                    </div>




                    <div style={{ marginTop: '20px' }}>
                      {currentPatients.map((patient1, index) => (
                        // Render a PatientHeader for each patient in the list
                        <PatientHeaderVisit key={index} patientdata={patient1} />
                      ))}
                    </div>
                    {/* Pagination */}

                    <MaterialUIPagination
                      currentPage={currentPage1}
                      totalPages={Math.ceil(patientsearchDetails.length / patientsPerPage1)}
                      onPageChange={onPageChange}
                    />

                  </Form>
                )}
              </Formik>
            </Container>
          </Grid>
        </Grid>


      </Dialog>



    </>
  );
}
