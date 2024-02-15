// /expenses => shared layout

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { requireSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData();
  console.log(expenses);

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(expenses)
            )}`}
            download={`expenses.json`}>
           <FaDownload />
           <span>Download JSON</span> 
          </a>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Download Expenses</span>
          </a>
        </section>
       {hasExpenses && <ExpensesList expenses={expenses} />}
       {!hasExpenses && <section id="no-expenses">
        <h1>No expenses found</h1>
        <p>Start <Link to="add">adding some</Link> today.</p>
          </section>}
      </main>
    </>
  );
}

export async function loader({request}) {

  const userId = await requireSession(request);

  const expenses = getExpenses(userId);
  // return expenses;
  return json(expenses, {
    headers: {
      'Cache-Control': 'max-age=3',
    },
  });
  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     { message: "Could not find any expenses." },
  //     { status: 404, statusText: "No expenses found" }
  //   );
  // }
}

// export function CatchBoundary() {
//   return <p>Error.</p>
// }

export function headers({
  actionHeaders,
  loaderHeaders,
  parentHeaders
}) {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control') // 60 minutes
  }
}