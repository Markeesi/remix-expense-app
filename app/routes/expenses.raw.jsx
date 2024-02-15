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

// import { useLoaderData } from "@remix-run/react";
import { requireSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";



export async function loader({request}) {

  const userdId = await requireSession(request);

  const file = getExpenses(userdId);
  return file;
}

// export default function raw() {
//   const file = useLoaderData()
//   return (
//     <>
//     <a href={`data:text/json;charset=utf-8,${encodeURIComponent(
//               JSON.stringify(file)
//             )}`}
//             download="filename.json"
//           >
//             {`Download Json`}
//           </a>
//     </>
    
//     )
// }