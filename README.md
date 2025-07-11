# 🌱 GreenStock

A modern, full-stack plant inventory management application built with Next.js, TypeScript, and Prisma. Track your plant collection with ease using a beautiful, responsive interface.

![GreenStock](https://img.shields.io/badge/Plantventory-GreenStock-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.11.1-purple)

## ✨ Features

### 🌿 Plant Management

- **Add Plants**: Create new plant entries with detailed information
- **Edit Plants**: Update plant details including name, description, category, price, and stock
- **Delete Plants**: Remove plants from your inventory
- **Plant Categories**: Organize plants by categories (Indoor, Outdoor, Succulent, Flowering, Herb, Fern, Tree, Shrub)
- **Stock Tracking**: Monitor plant stock levels
- **Price Management**: Set and track plant prices

### 🖼️ Image Management

- **Image Upload**: Upload plant images using UploadThing integration
- **Image Display**: View plant images in detailed plant cards
- **Responsive Images**: Optimized image display across all devices

### 🔍 Search & Filter

- **Search Plants**: Find plants by name with real-time search
- **Category Filter**: Filter plants by category
- **Combined Search**: Use both search and category filters simultaneously

### 👤 User Authentication

- **Secure Authentication**: Built with Stack authentication
- **User-Specific Data**: Each user sees only their own plant collection
- **Protected Routes**: Secure access to plant management features

### 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Modern UI**: Built with shadcn/ui components
- **Dark/Light Mode**: Theme support with next-themes
- **Beautiful Animations**: Smooth transitions and hover effects

### 🚀 Performance

- **Client-Side Rendering**: Fast, responsive user interface
- **Optimized Queries**: Efficient database queries with Prisma
- **Image Optimization**: Next.js image optimization
- **Dynamic Loading**: Skeleton loading states for better UX

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend

- **Prisma** - Database ORM
- **PostgreSQL** - Primary database (via Neon)
- **Stack** - Authentication and user management
- **UploadThing** - File upload service

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Next.js** - Development server and build tools

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/plantventory.git
cd plantventory
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Stack Authentication (if using Stack)
STACK_APP_ID="your-stack-app-id"
STACK_APP_SECRET="your-stack-app-secret"

# UploadThing (for image uploads)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Stack](https://stack-auth.com/) for authentication
- [UploadThing](https://uploadthing.com/) for file uploads
- [Prisma](https://www.prisma.io/) for database management
- [Next.js](https://nextjs.org/) for the amazing framework

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
