import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStudents() {
    setLoading(true);
    setError("");

    const { data, error: queryError } = await supabase
      .from("students")
      .select("id, full_name, email, course, created_at")
      .order("full_name", { ascending: true });

    if (queryError) {
      setError(queryError.message);
      setStudents([]);
    } else {
      setStudents(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <main className="page">
      <section className="panel">
        <div className="heading">
          <div>
            <p className="eyebrow">SUPABASE + POSTGRESQL</p>
            <h1>Student Management</h1>
            <p className="subtitle">
              A small React app reading student records from Supabase.
            </p>
          </div>
          <button onClick={loadStudents} disabled={loading}>
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>

        {loading && <p className="message">Loading students…</p>}
        {error && (
          <div className="error">
            <strong>Could not load students</strong>
            <p>{error}</p>
            <p>
              Check your project URL, publishable key, table name, and Row
              Level Security policy.
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="count">
              {students.length} student{students.length === 1 ? "" : "s"} found
            </p>
            {students.length === 0 ? (
              <p className="message">
                No records yet. Run the SQL script in database/students.sql.
              </p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Full name</th>
                      <th>Email</th>
                      <th>Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.full_name}</td>
                        <td>{student.email}</td>
                        <td>{student.course}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        <p className="footnote">
          Demo data only. Do not put real or confidential student information
          in this public-read example.
        </p>
      </section>
    </main>
  );
}
