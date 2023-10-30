//import React from 'react';
import Avatar from '@mui/material/Avatar';
import male from '../../../../assets/images/m.png';
import female from '../../../../assets/images/f.png';
import defaultPic from '../../../../assets/images/defaultPic.png';
import { Box, Grid, Typography, IconButton } from '@mui/material';
// import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
// import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
// import RequestQuoteTwoToneIcon from '@mui/icons-material/RequestQuoteTwoTone';
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip'; // Import Chip component
import { Divider } from '@mui/material';
import React, { useState } from 'react';
function PatientHeader({ patientdata, encounterId }) {
  debugger;
  function showGenderPic(patientdata) {
    if (patientdata?.Gender === 7) {
      return male;
    }
    if (patientdata?.Gender === 8) {
      return female;
    } else {
      return defaultPic;
    }
  }

  function showGender(patientdata) {
    if (patientdata?.Gender === 7) {
      return 'Male';
    }
    if (patientdata?.Gender === 8) {
      return 'Female';
    } else {
      return 'N/A';
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const createVisit = () => {
        // Handle the "Create Visit" action here


        handleMenuClose();
    };

    const moreDetails = () => {
        // Handle the "More Details" action here
        handleMenuClose();
    };

    const editRegDetails = () => {
        // Handle the "Edit Reg Details" action here
        handleMenuClose();
    };

  // const handleCreateVisit = () => {
  //   // setCreateVisitDialogOpen(true);
  //   // setSelectedPatient(patientdata);
  //   handleMenuClose();
  // };



  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  }

  const formattedDate = formatDate(patientdata?.DateOfBirth);
  const dateOfBirth = formattedDate === 'Invalid Date' ? 'N/A' : formattedDate;


  const visitedDateTimeNew = patientdata.VisitedDateTime; // Your date and time string

 // const visitedDateTime = "2023-10-25T13:19:39.663"; // Your date and time string

  // Create a JavaScript Date object
  const dateObject = new Date(visitedDateTimeNew);
  
  // Define options for formatting the date
  const dateOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  
  // Define options for formatting the time in 12-hour format with AM/PM
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Use 12-hour format with AM/PM
  };
  
  // Format the date and time separately
  const formattedDate1 = dateObject.toLocaleString('en-US', dateOptions);
  const formattedTime = dateObject.toLocaleString('en-US', timeOptions);
  
  // Combine date and time with a comma
  const combinedDateTime = `${formattedDate1}, ${formattedTime}`;
  
 


  function calculateAge(dateString) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    let yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
    let monthsDiff = currentDate.getMonth() - birthDate.getMonth();
    let daysDiff = currentDate.getDate() - birthDate.getDate();

    // Adjust age components based on negative values
    if (daysDiff < 0) {
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      daysDiff += lastDayOfMonth;
      monthsDiff--;
    }
    if (monthsDiff < 0) {
      monthsDiff += 12;
      yearsDiff--;
    }
    if (!yearsDiff) {
      return 'N/A';
    }
    return `${yearsDiff}Y ${monthsDiff}M ${daysDiff}D`;
  }
  const age = calculateAge(dateOfBirth);
  // const encounterId1 = encounterId; // Extract encounterId from patientdata
  // const en3 = patientdata?.GeneratedEncounterId;


  const patientContent = (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={1}>
        <Avatar src={showGenderPic(patientdata)} sx={{ width: 60, height: 60 }} />
      </Grid>
      <Grid item xs={3} sx={{ padding: '8px' }}>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: '700' }}>UhId:</span> {patientdata?.UhId || 'N/A'}
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: '700' }}>VisitId:</span> {patientdata?.GeneratedEncounterId || 'N/A'}
        </Typography>
        {/* <Typography variant="body2">
          <span style={{ fontWeight: '700' }}>VisitId:</span>
          {en3 ? (
            <Chip label={en3} size="small" color="secondary" />
          ) : (
            encounterId1 ? (
              <Chip label={encounterId1} size="small" color="secondary" />
            ) : (
              <span style={{ color: 'red' }}>N/A</span>
            )
          )}
        </Typography> */}
      </Grid>
      <Grid item xs={4} sx={{ padding: '8px' }}>
        <Typography variant="body1" sx={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: '700' }}>{patientdata?.PatientFirstName || 'N/A'}</span>
        </Typography>
        <Typography variant="body2">{age}</Typography>
      </Grid>
      <Grid item xs={1.5} sx={{ padding: '8px', position: 'relative' }}>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          {showGender(patientdata)}
        </Typography>
        <Typography variant="body2">{dateOfBirth}</Typography>
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            bottom: 0,
            left: 'calc(100%)', // Add space between text and divider
            width: '1px',
            backgroundColor: 'black'
          }}
        ></Box>
      </Grid>
      {/* <Grid item xs={2.5} sx={{ padding: '8px', display: 'flex', justifyContent: 'space-around' }}>
        <IconButton color="secondary" aria-label="add an alarm">
          <FolderCopyTwoToneIcon fontSize="large" />
        </IconButton>
        <IconButton color="secondary" aria-label="add an alarm">
          <InfoTwoToneIcon fontSize="large" />
        </IconButton>
        <IconButton color="secondary" aria-label="add an alarm">
          <RequestQuoteTwoToneIcon fontSize="large" />
        </IconButton>
      </Grid> */}
      <Grid item xs={2.5} sx={{ padding: '8px', display: 'flex', justifyContent: 'space-around' }}>
        <IconButton
          aria-label="more"
          aria-controls="patient-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MoreVertIcon fontSize="large" />
        </IconButton>
        <Menu
          id="patient-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={createVisit}>Cancel Visit</MenuItem>
          <MenuItem onClick={moreDetails}>Edit Visit Details</MenuItem>
          <MenuItem onClick={editRegDetails}>More Details</MenuItem>
        </Menu>
      </Grid>
      {/* Add the CreateVisitDialog component */}
      {/* <CreateVisitDialog
        isOpen={isCreateVisitDialogOpen}
        onClose={handleCloseDialog}
        selectedRow={selectedPatient}
      /> */}
      <Divider sx={{ width: '100%' }} />
      <Grid item xs={3} sx={{ padding: '8px' }}>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: '700' }}></span> {patientdata?.PatientTypeName || 'N/A'}
          {/* <Chip label={patientdata?.PatientTypeName || 'N/A'} size="small" color="primary" /> */}
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ padding: '8px' }}>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: '700' }}>Provider:</span> {patientdata?.ProviderName || 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ padding: '8px' }}>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: '700' }}>Status:</span>
        </Typography>
        <Chip label="Waiting" size="small" color="primary" />
      </Grid>
      <Grid item xs={3} sx={{ padding: '8px' }}>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: '700' }}>VisitedDateTime:</span>
        </Typography>
        {combinedDateTime ? (
          <Chip label={combinedDateTime} size="small" color="primary" />
        ) : (
          "N/A"
        )}
      </Grid>
    </Grid>
  );


  return (
    <Box
      width={'100%'}
      height={'150px'}
      border={2}
      borderColor="#9e9e9e"
      //backgroundColor="#ECF2FF"
      borderRadius={2}
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      p={2}
      mb={2}
    >
      {patientContent}
    </Box>
  );
}

export default PatientHeader;
