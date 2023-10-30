import { lazy } from 'react';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const Patient = Loadable(lazy(() => import('views/Patient/Patient')));
const Laboratory = Loadable(lazy(() => import('views/Laboratory/Laboratory')));
const Billing = Loadable(lazy(() => import('views/Billing/Billing')));
const Master = Loadable(lazy(() => import('views/Master/Master')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //


// const data =
// {
//   "header": {
//     "userContext": {
//       "AppUserId": 10,
//       "UserId": null,
//       "AppUserName": "Keystone Healthcare Technologies",
//       "LastLoginTime": "2023-08-04T18:08:39.4547811Z",
//       "Role_Id": 6,
//       "RoleName": "Admin",
//       "canUpdate": false,
//       "canDelete": false,
//       "canAdd": false,
//       "isAuthenticated": true
//     },
//     "menulist": [
//       {
//         "Main_Menu_Id": 1,
//         "MenuName": "Settings",
//         "MenuObjectName": "settings",
//         "Role_Id": 6,
//         "Parent_Id": null,
//         "AccessStatus": true,
//         "ActionName": "null",
//         "ControllerName": null,
//         "MenuLogoPath": "~/lib/gebotheme/gebo/img/settings.png",
//         "Submenu": [
//           {
//             "Main_Menu_Id": 5,
//             "MenuName": "Security",
//             "MenuObjectName": "Security",
//             "Role_Id": 6,
//             "Parent_Id": 1,
//             "AccessStatus": true,
//             "ActionName": null,
//             "ControllerName": null,
//             "MenuLogoPath": null,
//             "Submenu": [
//               {
//                 "Main_Menu_Id": 2,
//                 "MenuName": "Create Users",
//                 "MenuObjectName": "Createusers",
//                 "Role_Id": 6,
//                 "Parent_Id": 5,
//                 "AccessStatus": true,
//                 "ActionName": "UserScreen",
//                 "ControllerName": "User",
//                 "MenuLogoPath": null,
//                 "Submenu": []
//               },
//               {
//                 "Main_Menu_Id": 3,
//                 "MenuName": "Roles",
//                 "MenuObjectName": "Roles",
//                 "Role_Id": 6,
//                 "Parent_Id": 5,
//                 "AccessStatus": true,
//                 "ActionName": "UserRole",
//                 "ControllerName": "User",
//                 "MenuLogoPath": null,
//                 "Submenu": []
//               },
//               {
//                 "Main_Menu_Id": 4,
//                 "MenuName": "User Role Mapping",
//                 "MenuObjectName": "UserRoleMapping",
//                 "Role_Id": 6,
//                 "Parent_Id": 5,
//                 "AccessStatus": true,
//                 "ActionName": "UserRoleMap",
//                 "ControllerName": "User",
//                 "MenuLogoPath": null,
//                 "Submenu": []
//               },
//               {
//                 "Main_Menu_Id": 6,
//                 "MenuName": "Role Access",
//                 "MenuObjectName": "RoleAccess",
//                 "Role_Id": 6,
//                 "Parent_Id": 5,
//                 "AccessStatus": true,
//                 "ActionName": "RoleAccessScreen",
//                 "ControllerName": "User",
//                 "MenuLogoPath": null,
//                 "Submenu": []
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "Main_Menu_Id": 7,
//         "MenuName": "HMSentory",
//         "MenuObjectName": "HMSentory",
//         "Role_Id": 6,
//         "Parent_Id": null,
//         "AccessStatus": true,
//         "ActionName": null,
//         "ControllerName": null,
//         "MenuLogoPath": null,
//         "Submenu": []
//       }
//     ]
//   },
//   "data": null
// };


const MainRoutes = {  
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '/dashboard',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'patient',
      children: [
        {
          path: '/patient',
          element: <Patient />
        }
      ]
    },
    {
      path: 'Master',
      children: [
        {
          path: '/Master',
          element: <Master />
        }
      ]
    },
    {
      path: 'laboratory',
      children: [
        {
          path: 'laboratory',
          element: <Laboratory />
        }
      ]
    },
    {
      path: 'billing',
      children: [
        {
          path: 'billing',
          element: <Billing />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <Patient />
    }
  ]
};

export default MainRoutes;
