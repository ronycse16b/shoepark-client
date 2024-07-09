


import { useSelector } from "react-redux";
import { usePathname } from 'next/navigation'

export default function DashNavbar({handleToggleClick,setMobileMenuOpen}) {


    const { userInfo, loading, error } = useSelector((state) => state.auth);
    const pathname = usePathname();

  return (
    <div className="navbar bg-white items-center  sticky top-5 px-4 py-4 flex justify-between  z-40  ">
      <div className="">
        <button
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          className="p-2 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5 fill-current dark:text-gray-100"
          >
            <rect width="352" height="32" x="80" y="96"></rect>
            <rect width="352" height="32" x="80" y="240"></rect>
            <rect width="352" height="32" x="80" y="384"></rect>
          </svg>
        </button>
      </div>

     

      <div className="">
        

            {
                <h1 className="uppercase font-bold text-sm">{pathname }</h1>
            }

          
         
       
      </div>
    </div>
  )
}
