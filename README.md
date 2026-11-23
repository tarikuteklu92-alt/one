# Supabase Student Management Demo

A beginner-friendly React + Vite example that reads fictional student records from a Supabase-hosted PostgreSQL database.

## 1. Requirements

- A Supabase account and project
- Node.js (LTS version)
- Visual Studio Code
- Basic familiarity with opening a terminal

## 2. Create the database table

1. Open your Supabase project dashboard.
2. Open **SQL Editor**.
3. Open `database/students.sql` from this project.
4. Copy its contents into the SQL Editor and click **Run**.
5. Open **Table Editor** and confirm that the `students` table contains three fictional records.

The SQL script creates the table, enables Row Level Security (RLS), adds a demo read policy, and inserts sample records.

## 3. Get your Supabase application credentials

1. In the Supabase dashboard, open your project's **Connect** dialog (or the API Keys / Project URL area, depending on the dashboard layout).
2. Copy the **Project URL**.
3. Copy the **publishable key**. It may be labelled `sb_publishable_...`.
4. Do not copy a secret key or database password into this frontend project.

## 4. Configure the project

1. Extract the ZIP file.
2. Open the extracted `supabase-student-demo` folder in VS Code.
3. In the project root, make a copy of `.env.local.example`.
4. Rename the copy to `.env.local`.
5. Replace the example values with your own project URL and publishable key:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Do not add quotation marks unless your framework specifically requires them. Keep `.env.local` private; it is excluded by `.gitignore`.

## 5. Install and run

Open the VS Code terminal in the project folder and run:

```bash
npm install
npm run dev
```

Vite will show a local address, usually `http://localhost:5173`. Open that address in your browser.

You should see the three sample students. Click **Refresh** to request the records again.

## 6. Understand the connection

- `src/supabase.js` creates the reusable Supabase client.
- `src/App.jsx` calls `.from("students").select(...)` to read records.
- `database/students.sql` defines the PostgreSQL table and demo records.
- `.env.local` stores the project URL and publishable key for local development.

The browser communicates with the Supabase Data API. It does not connect directly to PostgreSQL using a database connection string.

## 7. Security warning

This is a learning demo. Its RLS policy deliberately allows anonymous and authenticated visitors to read every row in the demo `students` table. The records are fictional.

**Do not use this policy or public-read access for real student, customer, or private business data.** For a real application, design policies around authenticated users and the records they are permitted to access. Never put a Supabase secret key or PostgreSQL database password in frontend code.

## 8. Common problems

- **Missing environment variables:** confirm the file is named `.env.local`, is in the project root, and contains both values. Restart `npm run dev` after changing it.
- **Invalid API key / project URL:** copy the Project URL and publishable key from the same Supabase project.
- **Permission denied / row-level security error:** check that the SQL script ran successfully and that the demo read policy exists.
- **Table not found:** confirm the table is named `students` and is in the `public` schema.
- **npm is not recognized:** install Node.js LTS, restart VS Code, and try again.

## 9. Useful commands

```bash
npm install       # Install dependencies
npm run dev       # Start the development server
npm run build     # Build the app for production
npm run preview   # Preview the production build
```
