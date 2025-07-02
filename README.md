# ShopHub - A Modern E-Commerce Platform 🛍️

ShopHub is a feature-rich e-commerce front-end built with **Next.js 15** and the **App Router**. It demonstrates a complete user flow from Browse products, searching and filtering, to user authentication, adding items to a persistent cart, and completing a checkout process.

This project was built to showcase modern web development practices, including server components, client-side state management with context, and secure authentication flows.

## ✨ Features

- **Product Catalog**: Browse a grid of products fetched from a live API.
- **Advanced Filtering & Sorting**: Filter products by category, price range, and rating. Sort products by price, name, or rating.
- **Real-time Search**: Instantly search for products by title.
- **User Authentication**: A complete login flow using JWTs stored in secure, HTTP-Only cookies.
- **Protected Routes**: Server-side protection using Next.js Middleware for user-specific pages (e.g., Cart, Profile).
- **API-Driven Shopping Cart**: Add, update, and remove items from a shopping cart that is synced with the server.
- **Checkout & Order Confirmation**: A multi-step process from cart to a final order confirmation page.
- **Responsive Design**: A clean and modern UI built with Tailwind CSS, fully responsive for all screen sizes.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Authentication**: JWT (JSON Web Tokens) with HTTP-Only Cookies
- **Icons**: [Font Awesome](https://fontawesome.com/)

---

## 🌐 API Endpoints

This project is powered by the free [**FakeStoreAPI**](https://fakestoreapi.com). The primary endpoints used are:

- **Products**: `GET https://fakestoreapi.com/products`
- **Authentication**: `POST https://fakestoreapi.com/auth/login`
- **Carts**:
  - `GET https://fakestoreapi.com/carts/user/:userId`
  - `PUT https://fakestoreapi.com/carts/:cartId`

The application also uses internal API routes (`/api/...`) to securely interact with the external API and manage cookies.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.17 or later)
- A package manager (npm, yarn, pnpm, or bun)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install NPM packages:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

The project follows the standard Next.js App Router structure:

- `app/`: Contains all routes, UI components, and logic.
  - `api/`: Houses all internal API routes for handling tasks like login and auth status checks.
  - `context/`: Contains React Context providers for global state management (`AuthContext`, `CartContext`).
  - `ui/`: Shared, reusable UI components (`Header`, `ProductCard`, etc.).
  - `(routes)/`: Each folder represents a route (e.g., `/cart`, `/login`).
- `middleware.ts`: Handles server-side route protection.

---

## 🚢 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
