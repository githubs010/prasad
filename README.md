# Business Billing System

This project is a simple prototype for a billing dashboard. It includes a login
flow, theme customization (dark mode and multiple color themes) and a universal
search bar that helps navigate between modules such as invoice, stock
management and customer records. The system also provides sample pages for
reports, product and purchase management.

Recent updates add an invoice workflow. Invoice numbers are automatically
incremented using `localStorage` and the sales form offers a **Print Invoice**
button for customer copies. The customers list now includes a **Bill** link for
quickly opening the sales form with the customer's name prefilled.

All pages are static HTML and use a small script (`scripts.js`) to simulate
authentication using `localStorage`.
