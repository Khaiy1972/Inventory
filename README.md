# Inventory Management System

This is a simple inventory management system that interacts with the **dummyJson API** to manage product listings. Users can **add, update, and delete** products, as well as upload product images.

## Important Notes

- **Adding a product** is a simulated process; it is **not** actually stored on the dummyJson server.
- The **newly added product** is not retained in a `useState` hook, as the UI refresh triggers a re-fetch from the dummyJson API.
- **Deleting a product** only mimics the removal process and does not delete it from the dummyJson server.
- The **deleted product** remains in the state because the UI update refetches data from the API.
- The same logic applies when **updating a product**—changes are simulated but not saved on the server.

## Before Starting

- First install all dependencies using the command `npm install`
- Then Start the server `npm run dev`
- If there is nothing to see navigate to the **log in page** `http://localhost:5173/login`

## Accessing the Dashboard

To log in and access the system, use the following credentials:

- **Username:** `emilys`
- **Password:** `emilyspass`
