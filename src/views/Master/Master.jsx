import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  TableContainer, Paper, Button
} from '@mui/material';
import Box from '@mui/material/Box';
import { urlGetAllGeneralLookUp } from '../../endpoints.ts';
//import { urlAddNewLookup } from '../../endpoints.ts';
//import { useFormik } from 'formik';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
import { Grid } from '@mui/material';
//import { Formik, Form } from 'formik';
import { Container } from '@mui/system';
import * as Yup from 'yup';
import AutoCompleteSelect from 'components/AutocompleteData/Auto.js';
import TextField from '../Patient/FormsUI/Textfield';
const validationSchema = Yup.object().shape({
  autocompleteField: Yup.object().nullable().required('Please select an option'),
  textField: Yup.string().required('Required')
});
export default function GeneralLookUp() {
  const [GeneralLookUp, setGeneralLookUp] = useState([]);
  const [value, setValue] = React.useState('1');
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [autocompleteData, setAutocompleteData] = useState([]);
  // const [isRowSelected, setIsRowSelected] = useState(false);
  const handleChange = (event, newValue) => {

    setValue(newValue);
    // Check if the new value is '1' (Tab 1) and reset data
    if (newValue === '1') {
      //formik.resetForm(); // Reset form values
      // setIsRowSelected(false); // Deselect the row
      //setSelectedRowData(null); // Clear selected row data
    }
  };

  useEffect(() => {
    axios.get(urlGetAllGeneralLookUp)
      .then(response => {

        if (response.status === 200) {
          setGeneralLookUp(response.data.data.masters);
          setAutocompleteData(response.data.data.lookuptypes);
          // console.log(response.data.data.masters);
          // console.log(response.data.data.lookuptypes);
        } else {
          alert("hi");
          //handleAPIError("Failed to fetch data from the server.");
        }
      })
      .catch(error => {
        // alert("this is error");
        console.error('An error occurred:', error);
        //setError(error.message || 'An error occurred.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [handleChange]);

  const columns = [
    //  { field: 'LookupID', headerName: 'LookupID', width: 70, hide: true },
    { field: 'LookupType', headerName: 'LookupType', flex: 1 },
    { field: 'LookupDescription', headerName: 'LookupDescription', flex: 1 }
  ];


  return (
    <Formik
      initialValues={{
        autocompleteField: null,
        textField: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {

        // ... Existing form submission logic ...
        console.log('Form values:', values);

      }}
    >
      {(formikProps) => (
        <TabContext value={value}>
          {/* ... Rest of your component ... */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="LookUp" value="1" />
              <Tab label="Add LookUp" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableContainer component={Paper}>
              <div style={{ width: '100%' }}>
                {loading ? (
                  <p>Loading...</p> // Show loading text
                ) : (
                  <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    rows={GeneralLookUp}
                    // onRowClick={(params) => handleRowClick(params)}
                    columns={columns}
                    initialState={{
                      ...GeneralLookUp.initialState,
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    slots={{ toolbar: GridToolbar }}
                    getRowId={(row) => row.LookupID} // Specify the custom id property here
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                      }
                    }}
                  />
                )}
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
            <Box sx={{ width: '100%', backgroundColor: 'white', padding: '0' }}>
              <form onSubmit={formikProps.handleSubmit}>
                <Grid container width={'100%'}>
                  <Grid item xs={12}>
                    <Container maxWidth="xlg">
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <AutoCompleteSelect
                            name="autocompleteField"
                            options={autocompleteData}
                            getOptionLabel={(option) => option.LookupType}
                            getOptionValue={(option) => option.LookupType}// Pass getOptionValue here
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField name="textField" label="LookupDescription" />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} textAlign={'end'}>
                        <Button type="submit">Submit</Button>
                      </Grid>
                    </Container>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </TabPanel>
        </TabContext>
      )}
    </Formik>
  );
}




