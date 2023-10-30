const baseURL = process.env.REACT_APP_API_URL;
export const urlWeather = `${baseURL}/WeatherForecast`;
export const urlLogin = `${baseURL}/api/User/Login`;
export const urlGetAllPatients = `${baseURL}/api/Patient`;
export const urlGetAllGeneralLookUp= `${baseURL}/api/Master/GetAllGeneralLookups`;
export const urlGetPatientDetail= `${baseURL}/api/Patient/GetPatientViewModel?PatientId=0`;
export const urlAddNewPatient= `${baseURL}/api/Patient/AddNewPatient`; 
export const urlAddNewLookup= `${baseURL}/api/Master/AddNewLookup`; 
export const urlEditNewLookup= `${baseURL}/api/Master/EditNewLookup`; 
export const urlSearchPatientRecord= `${baseURL}/api/Patient/SearchPatientRecord`;
export const urlUhidAutocomplete= `${baseURL}/api/Patient/AutocompleteUhid`;
export const urlEditPatientById= `${baseURL}/api/Patient/EditPatientById`;
export const urlGetAllVisitsToday= `${baseURL}/api/Encounter/GetAllVisitsToday`;
export const urlSearchVisitRecord= `${baseURL}/api/Encounter/SearchVisitRecord`;
export const urlSearchUHID= `${baseURL}/api/Patient/AutocompleteUhid`;
export const urlGetVisitDetailsWithPHeader= `${baseURL}/api/Encounter/GetVisitDetailsWithPHeader`;
export const urlGetDepartmentBasedOnPatitentType= `${baseURL}/api/Encounter/GetDepartmentBasedOnPatitentType`;
export const urlGetServiceLocationBasedonId= `${baseURL}/api/Encounter/GetServiceLocationBasedonId`;
export const urlGetProviderBasedOnDepartment= `${baseURL}/api/Encounter/GetProviderBasedOnDepartment`;
export const urlAddNewVisit= `${baseURL}/api/Encounter/SaveNewEncounter`;