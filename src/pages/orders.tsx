
// import { ReactElement, useEffect, useState } from "react";
// import TableHOC from "../components/admin/TableHOC";
// import { Column } from "react-table";

// type OrderItemType = {
//   productId: string;
//   name: string;
//   price: number;
// };

// type OrderType = {
//   _id: string;
//   total: number;
//   discount: number;
//   orderItems: OrderItemType[];
//   status: string;
// };

// type DataType = {
//   _id: string;
//   amount: number;
//   quantity: number;
//   discount: number;
//   status: ReactElement;

// };

// const column: Column<DataType>[] = [
//   {
//     Header: "ID",
//     accessor: "_id",
//   },
//   {
//     Header: "Quantity",
//     accessor: "quantity",
//   },
//   {
//     Header: "Discount",
//     accessor: "discount",
//   },
//   {
//     Header: "Amount",
//     accessor: "amount",
//   },
//   {
//     Header: "Status",
//     accessor: "status",
//   },

// ];

// // Mock data
// const mockData: { orders: OrderType[] } = {
//   orders: [
//     {
//       _id: "order1",
//       total: 1200,
//       discount: 100,
//       orderItems: [
//         { productId: "prod1", name: "Product 1", price: 400 },
//         { productId: "prod2", name: "Product 2", price: 800 },
//       ],
//       status: "Processing",
//     },
//     {
//       _id: "order2",
//       total: 1500,
//       discount: 150,
//       orderItems: [
//         { productId: "prod3", name: "Product 3", price: 750 },
//         { productId: "prod4", name: "Product 4", price: 750 },
//       ],
//       status: "Shipped",
//     },
//     {
//       _id: "order3",
//       total: 2000,
//       discount: 200,
//       orderItems: [
//         { productId: "prod5", name: "Product 5", price: 1000 },
//         { productId: "prod6", name: "Product 6", price: 1000 },
//       ],
//       status: "Delivered",
//     },
//   ],
// };

// const Orders = () => {
//   const [rows, setRows] = useState<DataType[]>([]);

//   const Table = TableHOC<DataType>(
//     column,
//     rows,
//     "dashboard-product-box",
//     "My Orders",
//     rows.length > 6
//   )();

//   useEffect(() => {
//     if (mockData)
//       setRows(
//         mockData.orders.map((i) => ({
//           _id: i._id,
//           amount: i.total,
//           discount: i.discount,
//           quantity: i.orderItems.length,
//           status: (
//             <span
//               className={
//                 i.status === "Processing"
//                   ? "red"
//                   : i.status === "Shipped"
//                     ? "green"
//                     : "purple"
//               }
//             >
//               {i.status}
//             </span>
//           )
//         }))
//       );
//   }, []);

//   return (
//     <div className="container">
//       {Table}
//     </div>
//   );
// };

// export default Orders;
import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { getDatabase, ref, get } from "firebase/database"; // Use the correct imports for Realtime Database
import { initializeApp } from "firebase/app"; // Make sure you have this import for initializing the Firebase app

type OrderItemType = {
  productId: string;
  name: string;
  price: number;
};

type OrderType = {
  _id: string;
  total: number;
  discount: number;
  orderItems: OrderItemType[];
  status: string;
};

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
};

// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA0DdGR_B31jq6P2tatW-piOCGp1Kf5caA",
  authDomain: "green-groove.firebaseapp.com",
  projectId: "green-groove",
  storageBucket: "green-groove.appspot.com",
  messagingSenderId: "84908534521",
  appId: "1:84908534521:web:82dabf72294ff1c6de1028",
  measurementId: "G-GY8WD1QM8P"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize Realtime Database

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const Orders = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const userId = "user123"; // Replace with the actual userId

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "My Orders",
    rows.length > 6
  )();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = ref(db, `orders/${userId}`);
        const snapshot = await get(ordersRef);

        if (snapshot.exists()) {
          const ordersData: OrderType[] = Object.entries(snapshot.val() || {}).map(
            ([key, value]: [string, any]) => ({
              _id: key,
              total: value.total,
              discount: value.discount,
              orderItems: value.orderItems,
              status: value.status,
            })
          );

          setRows(
            ordersData.map((order) => ({
              _id: order._id,
              amount: order.total,
              discount: order.discount,
              quantity: order.orderItems.length,
              status: (
                <span
                  className={
                    order.status === "Processing"
                      ? "red"
                      : order.status === "Shipped"
                        ? "green"
                        : "purple"
                  }
                >
                  {order.status}
                </span>
              ),
            }))
          );
        } else {
          console.log("No orders found for this user.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      {Table}
    </div>
  );
};

export default Orders;
