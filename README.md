# Inventory Management System

A simple inventory management system that uses the dummyJson API to manage products. The system allows users to add, update, and delete products, as well as upload product images.

## Disclaimers

- Adding a new product does not upload it to the dummyJson server; it only simulates the process.
- The new product data is not stored in a useState hook because the DOM updates fetch data again from the dummyJson API.
- Deleting a product does not remove it from the dummyJson server; it only simulates the deletion process.
- The deleted product data is not removed from the useState hook because the DOM updates refetch the data and store it in the useState.
- This also applies to the update function when you want to update the product data

##

To access the dashboard you must log in first using the credentials of

- username: emilys
- password: emilyspass
