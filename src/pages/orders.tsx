
import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";

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

// Mock data
const mockData: { orders: OrderType[] } = {
  orders: [
    {
      _id: "order1",
      total: 1200,
      discount: 100,
      orderItems: [
        { productId: "prod1", name: "Product 1", price: 400 },
        { productId: "prod2", name: "Product 2", price: 800 },
      ],
      status: "Processing",
    },
    {
      _id: "order2",
      total: 1500,
      discount: 150,
      orderItems: [
        { productId: "prod3", name: "Product 3", price: 750 },
        { productId: "prod4", name: "Product 4", price: 750 },
      ],
      status: "Shipped",
    },
    {
      _id: "order3",
      total: 2000,
      discount: 200,
      orderItems: [
        { productId: "prod5", name: "Product 5", price: 1000 },
        { productId: "prod6", name: "Product 6", price: 1000 },
      ],
      status: "Delivered",
    },
  ],
};

const Orders = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "My Orders",
    rows.length > 6
  )();

  useEffect(() => {
    if (mockData)
      setRows(
        mockData.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                    ? "green"
                    : "purple"
              }
            >
              {i.status}
            </span>
          )
        }))
      );
  }, []);

  return (
    <div className="container">
      {Table}
    </div>
  );
};

export default Orders;
