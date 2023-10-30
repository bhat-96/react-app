import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import patient from './patient'
import laboratory from './laboratory';
import billing from './billing';
import master from './master';

// ==============================|| MENU ITEMS ||============================== //

const leftMenuitems = {
  "id": "leftMenu",
  "type": "group",
  "children": [
    {
      "id": 1,
      "title": "Masters",
      "type": "collapse",
      "icon": null,
      "children": [
        {
          "id": 15,
          "title": "General Master",
          "type": "collapse",
          "icon": null,
          "children": [
            {
              "id": 20,
              "title": "Lookup",
              "type": "item",
              "icon": null,
              "children": [],
              "url": '/Master',
              "target": false,
              breadcrumbs: false
            },
            {
              "id": 21,
              "title": "User Registration",
              "type": "item",
              "icon": null,
              "children": [],
              "url": "",
              "target": false,
              breadcrumbs: false
            }
          ],

        },
        {
          "id": 16,
          "title": "Account Management",
          "type": "collapse",
          "icon": null,
          "children": [],
          "url": "",
          "target": false,
          breadcrumbs: false
        },
        {
          "id": 17,
          "title": "Laboratory Management",
          "type": "collapse",
          "icon": null,
          "children": [],
          "url": "",
          "target": false,
          breadcrumbs: false
        }
      ],
    
    },
    {
      "id": 2,
      "title": "Identity management",
      "type": "collapse",
      "icon": null,
      "children": [
        {
          "id": 18,
          "title": "Patient Registration",
          "type": "item",
          "icon": null,
          "children": [],
          "url":'/Patient',
          "target": false,
          breadcrumbs: false
        },
        {
          "id": 19,
          "title": "Encounter Creation",
          "type": "item",
          "icon": null,
          "children": [],
          "url": "",
          "target": false,
          breadcrumbs: false
        }
      ],
     
    },
    {
      "id": 3,
      "title": "Account Management",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    },
    {
      "id": 4,
      "title": "Claim Management",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    },
    {
      "id": 5,
      "title": "Resource Scheduling",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    },
    {
      "id": 6,
      "title": "Ward Management",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    },
    {
      "id": 7,
      "title": "Inventory Management",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    },
    {
      "id": 10,
      "title": "Pharmacy",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    },
    {
      "id": 11,
      "title": "Clinical Documents",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    },
    {
      "id": 12,
      "title": "Laboratory",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    },
    {
      "id": 14,
      "title": "Report",
      "type": "collapse",
      "icon": null,
      "children": [],
      "url": "",
      "target": false,
      breadcrumbs: false
    }
  ]
};



const menuItems = {
  items: [dashboard,leftMenuitems,patient,master,laboratory,billing, pages, utilities, other]
};

export default menuItems;
