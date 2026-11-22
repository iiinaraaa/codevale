import type { Metadata } from "next";
import { ProfileView } from "@/components/ProfileView";

export const metadata: Metadata = { title: "Codevale > Meu perfil" };

export default function ProfilePage() {
  return <ProfileView />;
}
