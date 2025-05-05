# Gym Z - Gym Equipment Rental Platform

Gym Z is a web application that allows users to rent gym equipment for home workouts. The platform makes gym equipment affordable and accessible for people who can't afford expensive gym subscriptions or don't have time to go to the gym.

## Features

- Browse a variety of gym equipment categories
- View detailed product information, pricing, and availability
- Select rental duration options (weekly/monthly)
- Add products to cart and manage quantities
- Checkout process with address and payment options
- User account system for order history and saved items
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Carousel**: React Slick
- **State Management**: React Hooks

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app` - Next.js app router pages
- `src/components` - Reusable React components
- `src/data` - Mock data for the application
- `public/images` - Product images and assets

## Main Components

- **Header**: Navigation bar with logo, search, cart, and user menu
- **Footer**: Site links and contact information
- **CategoryMenu**: Horizontal scrollable menu for equipment categories
- **ProductCard**: Card component for displaying individual products
- **ProductGrid**: Grid layout for displaying multiple product cards
- **Hero**: Hero section for the homepage

## Pages

- **Home**: Landing page with hero section, categories, and product grid
- **Product Detail**: Detailed product information, images, and rental options
- **Cart**: Shopping cart with product list and order summary
- **Checkout**: Address input and payment selection

## Deployment

This application can be deployed on any platform that supports Next.js, such as Vercel, Netlify, or traditional hosting services.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
