import StoreProvider from "@/app/StoreProvider";
import { Suspense } from "react";
import DashboardLoading from "./loading";
import "../../globals.css";

import Protect from "@/components/Protect";
import Dashboard from "@/components/Dashboard";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <StoreProvider>
          <Protect>
            <Dashboard>
              <Suspense fallback={<DashboardLoading />}>{children}</Suspense>
            </Dashboard>
          </Protect>

          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
