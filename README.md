# Masters of Programming

Full-stack web application for the Masters of Programming university club at University Abbas Laghrour Khenchela.

## **Tech Stack**

- **Frontend**: React 19, Vite, Tailwind CSS, Shadcn/ui
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with Passport.js
- **Routing**: Wouter (client-side), RESTful API

## **Features**

- ✓ Club information (Founders, Administration, Members)
- ✓ Projects showcase
- ✓ Membership application form
- ✓ Admin dashboard
- ✓ Dark/Light theme support
- ✓ Responsive design

## **Getting Started**

### **Prerequisites**

- Node.js 20+
- PostgreSQL database (local or Neon)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Masters-of-Programming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your database connection:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   NODE_ENV=development
   PORT=5000
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   In another terminal, start the client development server:
   ```bash
   npm run dev:client
   ```

   The app will be available at `http://localhost:5000`

## **Build & Deploy**

### **Build for production**
```bash
npm run build
```

### **Start production server**
```bash
npm run start
```

### **Type checking**
```bash
npm run check
```

## **Database**

Using Drizzle ORM with PostgreSQL. Database schema is defined in `shared/schema.ts`.

To update the database schema:
1. Modify `shared/schema.ts`
2. Run `npm run db:push` to apply changes

## **Project Structure**

```
.
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities & config
│   │   ├── hooks/       # Custom hooks
│   │   └── main.tsx     # Entry point
│   └── index.html
├── server/              # Express backend
│   ├── app.ts
│   ├── routes.ts
│   ├── storage.ts       # Database layer
│   ├── index-dev.ts     # Development server
│   └── index-prod.ts    # Production server
├── shared/              # Shared code
│   └── schema.ts        # Database schemas & validation
└── package.json
```

## **Available Scripts**

- `npm run dev` - Start development server
- `npm run dev:client` - Start client dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## **License**

MIT
