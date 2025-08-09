Apartment Frontend – Nawy

📌 Project Overview
Apartment Frontend – Nawy is a Next.js web application that allows users to browse apartment listings, view detailed information, and manage their accounts via authentication.
The project integrates with a backend API (documented via Swagger) for fetching apartment data and handling user authentication (login/signup).

It uses:
    Next.js (App Router) for the frontend framework
    TypeScript for type safety
    Tailwind CSS for styling
    Axios for HTTP requests to the backend
    Next Router for page navigation

 Getting Started

1️⃣ Prerequisites

Make sure you have:
Node.js (v18+ recommended)
npm, yarn, pnpm, or bun package manager

2️⃣ Installation

Clone the repository and install dependencies:
git clone <your-repo-url>
cd apartment-frontend
npm install

3️⃣ Running the Development Server

npm run dev

📂 Project Structure

src/
 ├── app/                 # Main application pages (Next.js App Router)
 │   ├── apartments/      # Apartments listing & details
 │   │   ├── page.tsx     # List all apartments
 │   │   ├── [id]/page.tsx# Apartment details page
 │   ├── authentication/  # Login & Signup pages
 │   │   ├── login/page.tsx
 │   │   ├── signup/page.tsx
 │   ├── globals.css       # Global styles
 │   ├── layout.tsx        # Root layout
 │   └── page.tsx          # Home page
 ├── components/           # Reusable UI components
 └── ...

🖥 Pages & Features

🔑 Authentication

1. Login Page (/authentication/login)
    Allows users to log in with username and password
    Sends POST request to http://IPAdressIPV4/authentication/login
    On success → redirects to /apartments

2. Signup Page (/authentication/signup)
    Allows new users to create accounts
    Sends POST request to http://IPAdressIPV4:Port/authentication/signup with default role "user"
    On success → redirects to /apartments

🏢 Apartments
1. Apartments List (/apartments)
    Fetches apartments from backend API
    Displays a list with basic details
    Clicking on an apartment navigates to details page

2. Apartment Details (/apartments/[id])
    Displays detailed apartment information fetched via ID from backend
    Uses useEffect to fetch data on mount
    Shows layout, price, and other property details

🔗 API Integration
The frontend communicates with the backend using Axios to call REST API endpoints:

Action	                Method	            Endpoint
Login	                POST	            /auth/login
Signup	                POST	            /auth/signup
Get Apartments	        GET	                /apartments
Get Apartment by ID	    GET             	/apartments/:id

🛠 Technologies Used
Next.js         – React framework for server-rendered apps
TypeScript      – Static type checking
Tailwind CSS    – Utility-first styling
Axios           – HTTP client for API requests
Next Router     – Navigation between pages

