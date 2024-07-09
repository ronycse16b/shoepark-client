"use client";
import { useAppSelector } from "@/redux/hooks";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserProfileQuery } from "@/redux/features/api/authApi";
import axiosInstance from "@/utils/axiosInstance";
export default function Profile() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { data, isError, refetch } = useUserProfileQuery();

  const [name, setName] = useState(userInfo?.name || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/updateProfile?email=${userInfo?.email}`,
        {
          name,
          oldPassword,
          newPassword,
        }
      );

     

      if (response.status === 200) {
        toast.success("Profile has been updated");

        setOldPassword("");
        setNewPassword("");
        refetch();
        setError("");

        setIsLoading(false);
      } else {
        toast.error("Failed to update profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("There was an error updating the profile!", error);
      setError(error?.response?.data);
      toast.error("There was an error updating the profile!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsFetching(true);

    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
        }
      );

      if (response.status === 201) {
        toast.success("User created successfully");
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        getUsers();
        setError2('')
      } else {
        toast.error("Failed to create user");
      }
    } catch (error) {
      setError2(
        error.response?.data?.message || "There was an error creating the user!"
      );
      toast.error("There was an error creating the user!");
    } finally {
      setIsFetching(false);
    }
  };

  async function getUsers() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/all-users`
      );
      setUserData(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update/${userId}`,
        { role: newRole }
      );

      if (response.status === 200) {
        toast.success("Role updated successfully");
        getUsers();
      } else {
        toast.error("Failed to update role");
      }
    } catch (error) {
      console.error("There was an error updating the role!", error);
      toast.error("There was an error updating the role!");
    }
  };

  const handelDeleteUser = async (userId, index) => {
    setDeletingIndex(index);
    try {
      const response = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/delete/${userId}`
      );

      if (response.status === 200) {
        toast.success("User has been deleted");
        getUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("There was an error deleting!", error);
      toast.error("There was an error deleting !");
    } finally {
      setDeletingIndex(null);
    }
  };

  return (
    <div className="mt-10">
      <div>
        <div className="bg-gray-100 relative shadow-lg overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
          <div className="flex items-center gap-4">
            <img
              src={userInfo?.image}
              className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
            />
            <div className="w-fit transition-all transform duration-500">
              <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                {userInfo?.name}
              </h1>
              <p className="text-gray-600 font-semibold">({userInfo?.role})</p>
              <a className="text-xs text-gray-500 font-bold transform transition-all delay-300 duration-500">
                {userInfo?.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-between flex-col lg:flex-row items-center mt-5">
        <form className="flex-1" onSubmit={handleProfileUpdate}>
          <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
            <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
              Account settings:
            </h2>
            <div className="flex flex-col gap-2 w-full border-gray-400">
              <div>
                <label className="text-gray-600 dark:text-gray-400">
                  User name
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 dark:text-gray-400">
                  Old Password
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="password"
                  required
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                {error && (
                  <span className="text-red-600 font-bold">{error}</span>
                )}
              </div>
              <div>
                <label className="text-gray-600 dark:text-gray-400">
                  New Password
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="py-1.5 px-3 m-1 text-center bg-primary border rounded-md text-white hover:bg-opacity-90"
                  type="submit"
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        </form>

       { userInfo&& userInfo?.role === 'admin' && <form className="flex-1" onSubmit={handleCreateUser}>
          <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
            <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
              Create New User:
            </h2>
            <div className="flex flex-col gap-2 w-full border-gray-400">
              {error2 && <div className="text-red-500">{error2}</div>}
              <div>
                <label className="text-gray-600 dark:text-gray-400">
                  User name
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="text"
                  placeholder="Full Name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="email"
                  placeholder="Enter email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 dark:text-gray-400">
                  Password
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="password"
                  placeholder="Enter a Password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="py-1.5 px-3 m-1 text-center bg-blue-700 border rounded-md text-white hover:bg-blue-500 hover:text-gray-100"
                  type="submit"
                >
                  {isFetching ? "Creating..." : "Create New User"}
                </button>
              </div>
            </div>
          </div>
        </form>}
      </div>
{

}
      {userInfo&& userInfo?.role === 'admin' &&
      
      <div className="overflow-x-auto rounded-md mt-5">
        {loading && "Loading..."}
        <h1>All Users</h1>
        <table className="min-w-[100%] shadow-md border mx-auto border-gray-100">
          <thead>
            <tr className="bg-[#4e5f6b] text-white">
              <th className="py-4 px-6 text-sm text-left border-b">
                User Image
              </th>
              <th className="py-4 px-6 text-sm text-left border-b">
                User Name
              </th>
              <th className="py-4 px-6 text-sm text-left border-b">Role</th>
              <th className="py-4 px-6 text-sm border-b text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 border-b transition duration-300"
              >
                <td className="py-4 px-4 flex justify-start">
                  <img
                    src={user?.image}
                    alt="user profile"
                    className="h-8 w-8 object-cover bg-gray-300"
                  />
                </td>
                <td className="py-4 px-6 border-b text-sm font-medium">
                  {user?.name}
                </td>
                <td className="py-4 px-6 border-b text-sm font-medium">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-2"
                  >
                    {/* <option value="user">User</option> */}
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    {/* Add other roles as needed */}
                  </select>
                </td>
                <td className="py-4 px-6 border-b text-sm text-end">
                  <button
                    onClick={() => handelDeleteUser(user?._id, index)}
                    className="rounded-md bg-red-600 hover:bg-red-700 px-6 py-1.5 text-white"
                  >
                    {deletingIndex === index ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
      
      
    </div>
  );
}
