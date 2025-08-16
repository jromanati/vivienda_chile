import { use } from "react";
import PropertyDetailClient from "@/components/admin/PropertyDetailClient";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // desenvuelve la promesa
  return <PropertyDetailClient id={Number(id)} />;
}
