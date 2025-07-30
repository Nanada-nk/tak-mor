/** @format */

import { useEffect } from "react";
import { BubblesIcon } from "lucide-react";
import userStore from "../../../stores/userStore.js";
import DoctorProfile from "../../../components/profile/doctorProfile.jsx";


function DoctorProfilePage() {
  const doctorProfile = userStore((state) => state.doctorProfile);
  const isLoadingProfile = userStore((state) => state.isLoadingProfile);
  const fetchUserProfile = userStore((state) => state.fetchUserProfile);

  useEffect(() => {
    if (!doctorProfile) {
      fetchUserProfile();
    }
  }, [doctorProfile, fetchUserProfile]);

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BubblesIcon className="w-10 h-10 animate-spin text-pri-gr1" />
      </div>
    );
  }

  if (!doctorProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Doctor profile not found.
      </div>
    );
  }

  return (
    <div>
      <DoctorProfile profile={doctorProfile} />
    </div>
  );

    //       <h2 className="text-xl font-bold text-gray-800 mb-4">
    //         Your Profile Details:
    //       </h2>

    //       <div className="space-y-3">
    //         <div>
    //           <p className="font-bold text-gray-700 text-sm">First Name:</p>
    //           <p className="text-gray-800 text-base p-2 bg-bg-cr2 rounded-lg">
    //             {user.firstName}
    //           </p>
    //         </div>

    //         <div>
    //           <p className="font-bold text-gray-700 text-sm">Last Name:</p>
    //           <p className="text-gray-800 text-base p-2 bg-bg-cr2 rounded-lg">
    //             {user.lastName}
    //           </p>
    //         </div>

    //         <div>
    //           <p className="font-bold text-gray-700 text-sm">Mobile:</p>
    //           <p className="text-gray-800 text-base p-2 bg-bg-cr2 rounded-lg">
    //             {user.mobile}
    //           </p>
    //         </div>
    //       </div>

    //       <div className="flex sm:flex-col gap-2 justify-center mt-4">
    //         <Link
    //           to="/profile/edit"
    //           className="btn btn-outline btn-sm border-pri-gr1 text-pri-gr1 hover:bg-pri-gr1 hover:text-white duration-700">
    //           Edit Profile
    //         </Link>
    //         <Link
    //           to="/profile/change-password"
    //           className="btn btn-outline btn-sm border-pri-gr1 text-pri-gr1 hover:bg-pri-gr1 hover:text-white duration-700">
    //           Change Password
    //         </Link>
    //         <Link
    //           to="/profile/addresses"
    //           className="btn btn-outline btn-sm border-pri-gr1 text-pri-gr1 hover:bg-pri-gr1 hover:text-white duration-700">
    //           Manage Addresses
    //         </Link>

    //         {user.role === "CUSTOMER" && (
    //           <Link
    //             to="/orders"
    //             className="btn btn-outline btn-sm border-pri-gr1 text-pri-gr1 hover:bg-pri-gr1 hover:text-white duration-700">
    //             My Orders
    //           </Link>
    //         )}
    //       </div>

    //       {(user.role === "SUPERADMIN" || user.role === "ADMIN") && (
    //         <Link
    //           to="/admin/users"
    //           className="inline-flex items-center justify-center w-full bg-orange-700 hover:bg-orange-900 text-white font-bold py-3 rounded-lg text-base transition-colors duration-700">
    //           Go to Admin Management
    //         </Link>
    //       )}
    //     </div>
    //   </ProfileLayout>
    // );

    // }
}
export default DoctorProfilePage
