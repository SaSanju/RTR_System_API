define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "C__website_nodejsApp_Table_Reservation_App_routes_doc_main_js",
    "groupTitle": "C__website_nodejsApp_Table_Reservation_App_routes_doc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "http://localhost:8000/api/book_restaurant",
    "title": "Book a table in a restaurant with the given capacity and given time range",
    "name": "Book_a_table",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "availability",
            "description": "<p>Availability of the table to be searched.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "restaurantId",
            "description": "<p>Id of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fromDateTime",
            "description": "<p>From Time Range .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "toDateTime",
            "description": "<p>To Time Range .</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bookingStatus",
            "description": "<p>Object which has booking details. Such as Restaurant id, Table id, Booking id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./customerApi.js",
    "groupTitle": "Customers"
  },
  {
    "type": "post",
    "url": "http://localhost:8000/api/cancel_table",
    "title": "Cancel a table",
    "name": "Cancel_Table",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bookingId",
            "description": "<p>Id of the table booking transaction.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Shows the successful cancelled message with the booking id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./customerApi.js",
    "groupTitle": "Customers"
  },
  {
    "type": "post",
    "url": "http://localhost:8000/api/review_by_customer",
    "title": "Write review on a Restaurant",
    "name": "Customer_Review",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "restaurantId",
            "description": "<p>Id of the restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customerEmail",
            "description": "<p>Email id of the customer (Proper email format).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>Name of the customer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customerReview",
            "description": "<p>Review about the restaurant written by customer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "object",
            "description": "<p>Shows the successful message along with added review data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./customerApi.js",
    "groupTitle": "Customers"
  },
  {
    "type": "post",
    "url": "http://localhost:8000/api/find_restaurant",
    "title": "Search Restaurants",
    "name": "Search_restaurants",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Keyword to match with the restaurant [Restaurant name] or [location] or [cuisine].</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "restaurants",
            "description": "<p>Array of restaurant object that matches any of the keywoard.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./customerApi.js",
    "groupTitle": "Customers"
  },
  {
    "type": "post",
    "url": "http://localhost:8000/api/find_restaurant_by_table_capacity",
    "title": "Search for table by capacity for a given Restauant",
    "name": "Search_restaurants_by_table_capacity",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "capacity",
            "description": "<p>Capacity of the table to be searched.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "restaurantId",
            "description": "<p>Id of the restaurant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "restaurantArr",
            "description": "<p>Array of restaurant object that matches the given table capacity.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./customerApi.js",
    "groupTitle": "Customers"
  },
  {
    "type": "POST",
    "url": "http://localhost:8000/api/add_restaurant",
    "title": "Adding new Restaurant",
    "name": "Add_Restaurant",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cuisine",
            "description": "<p>Cuisine that the restaurant does</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "restaturantId",
            "description": "<p>Id of the restaurant.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./restaurantApi.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "http://localhost:8000/api/add_table",
    "title": "Add table to a specific restaurant",
    "name": "Add_Table",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "restaurantId",
            "description": "<p>ID of the restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "capacity",
            "description": "<p>Set Capacity of a table.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tableid",
            "description": "<p>Id of the table created along with message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./restaurantApi.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "delete",
    "url": "http://localhost:8000/api/delete_restaurant/:id",
    "title": "Delete a Restaurant",
    "name": "Delete_Restaurant",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the Restaurant to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Shows a successful deleted message with restaurant ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./restaurantApi.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "delete",
    "url": "http://localhost:8000/api/delete_table/:id",
    "title": "Delete a Table.",
    "name": "Delete_Table",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the table to be deleted.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Shows a successful deleted message with table Id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./restaurantApi.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "http://localhost:8000/api/booking_list",
    "title": "Get bookings for a table by time range",
    "name": "Get_table_by_timeRange",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tableId",
            "description": "<p>ID of the table.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fromDateTime",
            "description": "<p>Time Range .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "toDateTime",
            "description": "<p>Time Range .</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "bookinList",
            "description": "<p>Array of restaurant object that has been booked for the given time range.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./restaurantApi.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "get",
    "url": "http://localhost:8000/api/get_onboardrestaurants",
    "title": "Showing new restaurants",
    "name": "Onboarding_Restaurant",
    "group": "Restaurant",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "restaurant",
            "description": "<p>Array of restaurant objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./restaurantApi.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "http://localhost:8000/api/update_table",
    "title": "Modify Capacity of a specific table",
    "name": "Update_Table",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tableId",
            "description": "<p>ID of the table.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "capacity",
            "description": "<p>Capacity of a table to be modified.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Shows a successful updation of the table with table Id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./restaurantApi.js",
    "groupTitle": "Restaurant"
  }
] });
