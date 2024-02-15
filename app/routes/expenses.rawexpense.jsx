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

import { requireSession } from "~/data/auth.server";
import { getExpense } from "~/data/expenses.server";



export async function loader({request}) {
 await requireSession(request);
  return getExpense();
}
