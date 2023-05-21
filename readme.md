# Finance Tracker

This is a full stack application that helps users keep track of their finances. The frontend is built with React and the backend is built with NestJS. This code uses typescript both in the backend and in the frontend. Learn more about typescript here. [Typescript Official Documentation](https://www.typescriptlang.org/)

## Features

- Users have a portal to manage their finances.
- Users can add their income, expense budget, savings, and investment data.
- Users can add daily expenses, which will be deducted from their expense budget.
- Users can visualize what portion of their budget is used.
- Users can view their monthly/weekly/daily expenditure list with filters of date and category.

### Optional Features

- Users can export reports in desired formats such as pdf, xlsx, csv.
- Users can receive email notifications if their budget is getting really low.
- Users can add email reminders for their loan payments.

## Installation

To run this project, you will need to have Node.js and npm installed on your machine.

## Backend

The backend server is made with nestjs, a framework built on top of ExpressJS. Learn more about it here. [Nestjs Official Documentation](https://nestjs.com/)

Clone this repository:

```bash
# Install dependencies
cd backend
pnpm install --shamefully-hoist
```

### Start the server

```bash
pnpm start:debug
```

## Frontend

The frontend is made with reactjs, a javascript library built on top of ExpressJS. Learn more about it here. [ReactJS Official Documentation](https://react.dev/)

```bash
# Install dependencies
cd frontend
pnpm install
```

```bash
# start development server
pnpm start
```
