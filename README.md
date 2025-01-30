# Inventory Management System

This is a simple inventory management system that interacts with the **dummyJson API** to manage product listings. Users can **add, update, and delete** products, as well as upload product images.

## Important Notes

- When deleting a freshly uploaded product, an error will occur since the product will not be stored on the DummyJson server. So, when requesting a deletion, the API will not recognize the ID of the new product and will return an error.
