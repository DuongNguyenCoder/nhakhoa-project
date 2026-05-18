"use client";

import AuthLayout from "@/layout/AuthLayout";
import ProfilePage from "@/pages/ProfilePage";
import RouterLayout from "@/provider/RouterLayout";
import { useSelector } from "react-redux";
import ProfileForm from "@/components/auth/ProfileForm";

export default function Page() {
  const currentUser = useSelector((state) => state.app.currentUser);
  return (
    <RouterLayout layout={AuthLayout}>
      <ProfileForm currentUser={currentUser} />;
    </RouterLayout>
  );
}
