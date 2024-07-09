"use client";
import { useState } from "react";

import { useGetAllOrdersQuery } from "@/redux/features/api/authApi";

import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import Invoice from "./Invoice";

// Replace with your server URL

const OrderManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);
  const [newStatusToUpdate, setNewStatusToUpdate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All dates");
  const { data, isFetching, refetch } = useGetAllOrdersQuery();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStatusChange = async (orderId, newStatus) => {
    // Open modal if status is 'On hold' or 'Cancelled'
    if (newStatus === "On hold" || newStatus === "Cancelled") {
      setOrderIdToUpdate(orderId);
      setNewStatusToUpdate(newStatus);
      return setOpenModal(true);
    }
    // Directly update status without modal for other cases
    try {
      // Make API call to update order status
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/status-update/${orderId}`,
        {
          status: newStatus,
          note: note, // Assuming your API accepts 'note' field for status update
        }
      );

      if (response?.data) {
        // Simulate loading completion
        setOrderIdToUpdate(null);
        setNewStatusToUpdate("");
        setNote("");
        setOpenModal(false);
        toast.success("Status has Been Updated");
        refetch();
      }
    } catch (error) {
      console.log("Error updating status:", error);
      // Handle error (e.g., show error message to user)
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);

    try {
      // Make API call to update order status
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/status-update/${orderIdToUpdate}`,
        {
          status: newStatusToUpdate,
          note: note, // Assuming your API accepts 'note' field for status update
        }
      );
      if (response?.data) {
        // Simulate loading completion
        setOrderIdToUpdate(null);
        setNewStatusToUpdate("");
        setNote("");
        setOpenModal(false);
        toast.success("Status has Been Updated");
        refetch();
      }
    } catch (error) {
      console.log("Error updating status:", error);
      // Handle error (e.g., show error message to user)
      setIsLoading(false);
    }
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  // Helper function to remove time part from date
  const stripTime = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const filteredOrders = data?.orders.filter((order) => {
    const orderDate = stripTime(order.createdAt);
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm =
      order.name.toLowerCase().includes(searchTermLower) ||
      order.mobile.toLowerCase().includes(searchTermLower);
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    const matchesDate =
      dateFilter === "All dates" ||
      (dateFilter !== "All dates" &&
        `${orderDate.toLocaleString("default", {
          month: "short",
        })} ${orderDate.getFullYear()}` === dateFilter);

    // Custom date filtering logic
    let isWithinDateRange = true;
    if (startDate && endDate) {
      const startDateObj = stripTime(startDate);
      const endDateObj = stripTime(endDate);

      // Ensure the order date falls within the start and end dates
      isWithinDateRange = orderDate >= startDateObj && orderDate <= endDateObj;
    }

    return (
      matchesSearchTerm && matchesStatus && matchesDate && isWithinDateRange
    );
  });

  const handleFilterOrderClear = () => {
    setStartDate("");
    setEndDate("");
  };

  const generateMonthYearOptions = (orders) => {
    const monthYearSet = new Set();
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const monthYear = `${orderDate.toLocaleString("default", {
        month: "short",
      })} ${orderDate.getFullYear()}`;
      monthYearSet.add(monthYear);
    });
    return ["All dates", ...Array.from(monthYearSet).sort()];
  };

  const monthYearOptions = data
    ? generateMonthYearOptions(data.orders)
    : ["All dates"];

  return (
    <>
      <div className="py-4 ">
        <h1 className="text-gray-700 my-5 lg:text-xl">Orders Management</h1>
        <div className="mb-4 flex lg:flex-col flex-wrap gap-4 ">
          <div className="flex flex-wrap lg:flex-row gap-1">
            <button
              className={`mr-2 ${
                statusFilter === "All"
                  ? "bg-gray-600 transition-all duration-200 text-white"
                  : "text-black"
              } px-4 py-2 border-b-4 border border-gray-600  hover:text-white hover:bg-gray-600 transition-all duration-200`}
              onClick={() => setStatusFilter("All")}
            >
              All ({data?.orders?.length})
            </button>
            <button
              className={`mr-2 ${
                statusFilter === "Processing"
                  ? "bg-green-600 transition-all duration-200 text-white"
                  : "text-black"
              } px-4 py-2 border-b-4 border border-green-600  hover:text-white hover:bg-green-600 transition-all duration-200`}
              onClick={() => setStatusFilter("Processing")}
            >
              Processing (
              {
                data?.orders.filter((order) => order.status === "Processing")
                  .length
              }
              )
            </button>
            <button
              className={`mr-2 ${
                statusFilter === "On hold"
                  ? "bg-yellow-600 transition-all duration-200 text-white"
                  : "text-black"
              } px-4 py-2 border-b-4 border border-yellow-600  hover:text-white hover:bg-yellow-600 transition-all duration-200`}
              onClick={() => setStatusFilter("On hold")}
            >
              On hold (
              {
                data?.orders?.filter((order) => order.status === "On hold")
                  .length
              }
              )
            </button>
            <button
              className={`mr-2 ${
                statusFilter === "Confirm"
                  ? "bg-teal-600 transition-all duration-200 text-white"
                  : "text-black"
              } px-4 py-2 border-b-4 border border-teal-600  hover:text-white hover:bg-teal-600 transition-all duration-200`}
              onClick={() => setStatusFilter("Confirm")}
            >
              Confirm (
              {
                data?.orders?.filter((order) => order.status === "Confirm")
                  .length
              }
              )
            </button>
            <button
              className={`mr-2 ${
                statusFilter === "Cancelled"
                  ? "bg-red-600 transition-all duration-200 text-white"
                  : "text-black"
              } px-4 py-2 border-b-4 border border-red-600  hover:text-white hover:bg-red-600 transition-all duration-200`}
              onClick={() => setStatusFilter("Cancelled")}
            >
              Cancelled (
              {
                data?.orders?.filter((order) => order.status === "Cancelled")
                  .length
              }
              )
            </button>
            <button
              className={`mr-2 ${
                statusFilter === "Shipping"
                  ? "bg-blue-600 transition-all duration-200 text-white"
                  : "text-black"
              } px-4 py-2 border-b-4 border border-blue-600  hover:text-white hover:bg-blue-600 transition-all duration-200`}
              onClick={() => setStatusFilter("Shipping")}
            >
              Shipping (
              {
                data?.orders?.filter((order) => order.status === "Shipping")
                  .length
              }
              )
            </button>
            <button
              className={`mr-2 ${
                statusFilter === "Completed"
                  ? "bg-sky-600 transition-all duration-200 text-white"
                  : "text-black"
              } px-4 py-2 border-b-4 border border-sky-600  hover:text-white hover:bg-sky-600 transition-all duration-200`}
              onClick={() => setStatusFilter("Completed")}
            >
              Completed (
              {
                data?.orders?.filter((order) => order.status === "Completed")
                  .length
              }
              )
            </button>
          </div>

          <div className="flex lg:flex-row flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Search orders / name"
              className="border border-gray-300 min-w-64 rounded-md p-2 mr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={dateFilter}
              onChange={handleDateFilterChange}
              className="border border-gray-300 rounded-md p-2"
            >
              {monthYearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mr-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mr-2"
            />
            {startDate && endDate && (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
                onClick={handleFilterOrderClear}
              >
                Clear
              </button>
            )}
          </div>
          
        </div>

        <div className="overflow-x-auto h-[60vh]">
          {isFetching && (
            <span className="text-primary font-bold">Loading...</span>
          )}
          <table className=" table-auto min-w-full bg-white border border-gray-300">
            <thead className="bg-primary text-white sticky top-0 z-10">
              <tr>
                <th className="p-2 border-r text-left">Order Number</th>
                <th className="p-2 border-r text-left">Customer Name</th>
                <th className="p-2 border-r text-left">Order Date</th>
                <th className="p-2 border-r text-left">Status</th>
                <th className="p-2 border-r text-left">Billing Address</th>
                <th className="p-2 border-r text-left">Total Taka</th>
                <th className="p-2 border-r text-left">Note</th>
                <th className="p-2 text-center">Invoice</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders?.map((order, index) => (
                <tr
                  key={index}
                  className={`border-t ${
                    order?.status === "Processing" ? "font-bold" : ""
                  }`}
                >
                  <td className="px-2 border-r ">#{order?.orderNumber} </td>
                  <td className="px-2 border-r">{order?.name}</td>
                  <td className="px-2 border-r">
                    {order?.createdAt?.slice(0, 10)}
                  </td>
                  <td className="px-2 border-r">
                    {statusFilter === "All" ? (
                      order?.status
                    ) : (
                      <select
                        disabled={order?.status === "Completed"}
                        className={`px-2 py-1 rounded ${
                          order?.status === "Processing"
                            ? "bg-green-100 text-green-700"
                            : order?.status === "On hold"
                            ? "bg-yellow-100 text-yellow-700"
                            : order?.status === "Completed"
                            ? "bg-blue-100 cursor-not-allowed text-blue-700"
                            : order?.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : order?.status === "Failed"
                            ? "bg-gray-100 text-gray-700"
                            : ""
                        }`}
                        value={order?.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        {order?.status === "Processing" ? (
                          <>
                            <option value="">Go to Next</option>
                            <option value="Confirm">Confirm</option>
                            <option value="On hold">On hold</option>
                            <option value="Cancelled">Cancelled</option>
                          </>
                        ) : order?.status === "On hold" ? (
                          <>
                            <option value="">Go to Next</option>
                            <option value="Confirm">Confirm</option>
                            <option value="Cancelled">Cancelled</option>
                          </>
                        ) : order?.status === "Confirm" ? (
                          <>
                            <option value="">Go to Next</option>
                            <option value="On hold">On hold</option>
                            <option value="Shipping">Shipping</option>
                          </>
                        ) : order?.status === "Cancelled" ? (
                          <>
                            <option value="">{order?.status}</option>
                          </>
                        ) : order?.status === "Shipping" ? (
                          <>
                            <option value="">Go to Next</option>
                            <option value="Completed">Completed</option>
                          </>
                        ) : order?.status === "Completed" ? (
                          <>
                            <option value="">{order?.status}</option>
                          </>
                        ) : (
                          ""
                        )}
                      </select>
                    )}
                  </td>
                  <td className="px-2 border-r">{order?.address}</td>
                  <td className="px-2 border-r">{order?.total}</td>
                  <td className="px-2 border-r">{order?.note}</td>
                  <td className=" flex justify-center">
                    <button onClick={()=>alert('generating...')} className=" border border-gray-300 rounded">
                      Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="font-bold">
            {filteredOrders?.length === 0 && <p>No Data Found</p>}
          </div>
        </div>
        <div className="mx-auto w-fit">
          <div
            onClick={() => setOpenModal(false)}
            className={`fixed z-[100] flex items-center justify-center ${
              openModal ? "visible opacity-100" : "invisible opacity-0"
            } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
          >
            <div
              onClick={(e_) => e_.stopPropagation()}
              className={`relative max-w-md rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${
                openModal
                  ? "scale-1 opacity-1 duration-300"
                  : "scale-0 opacity-0 duration-150"
              }`}
            >
              <h1 className="mb-2 text-2xl font-semibold">
                You want to Update Status!
              </h1>
              <p className="mb-5 text-sm opacity-80">
                if your product go to hold or cancel add note why cancel or hold
              </p>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter note"
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              />
              <div className="flex justify-between">
                <button
                  disabled={!note}
                  onClick={handleSaveChanges}
                  className="me-2 flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-[6px] text-white"
                >
                  {isLoading ? "Status Changing..." : " Save Changes"}
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Invoice/> */}

    </>
  );
};

export default OrderManagement;
