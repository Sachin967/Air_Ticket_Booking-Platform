
# Air Ticket Booking Platform


The Air Ticket Booking Platform is a web application designed to facilitate the search, comparison, and booking of flights. Users can search for flights based on various criteria, view detailed flight information, and complete bookings securely online.


## Features

- Flight Search: Users can search for flights based on departure/arrival locations, dates, and airlines.

- Flight Listings: Display detailed flight information including times, duration, and prices while searching.


- Booking Process: Step-by-step interface for selecting flights, entering passenger details, and making secure payments.

- User Authentication: Register, login, and logout functionality.

- Admin Panel: Backend API for creating flights (for admin users).




## Tech Stack


**Server:** Node.js,
Express.js,
MongoDB,
Mongoose,
Stripe.

**Frontend:** React.js,
Redux,
React Router,
Axios,
React Stripe.js,
Chakra UI,
Tailwind CSS.




## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/Sachin967/Air_Ticket_Booking-Platform.git

```

Install dependencies :
    
```bash
cd server
npm install

```
Set up environment variables:

- Create a .env file in the server.
- Add necessary environment variables like DB connection string, port number, stripe_secret .

Start the development servers:

```bash
npm start

```
Install frontend dependencies and start the server

```bash
cd ../client
npm install
npm run dev

```

## Appendix

There are still many features left to implement, such as passenger seat/airplane capacity and maybe an API for searching airports. These may be considered for future development.

