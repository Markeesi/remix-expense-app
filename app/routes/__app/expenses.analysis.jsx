import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { requireSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     title: "First Expense",
//     amount: 12.99,
//     date: new Date().toISOString(),
//   },
//   {
//     id: "e2",
//     title: "Second Expense",
//     amount: 19.99,
//     date: new Date().toISOString(),
//   },
//   {
//     id: "e3",
//     title: "Third Expense",
//     amount: 16.99,
//     date: new Date().toISOString(),
//   },
// ];

export default function ExpenseAnalysisPage() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <main>
      {hasExpenses && (
        <>
          <Chart expenses={expenses} />
          <ExpenseStatistics expenses={expenses} />
        </>
      )}
      {!hasExpenses && <p>No expenses to analyze.</p>}
    </main>
  );
}

export async function loader({ request }) {
  const userId = await requireSession(request);

  const expenses = getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Could not load expenses for the requested analysis." },
      {
        status: 404,
        statusText: "Expenses not found.",
      }
    );
  }
  return expenses;
}
