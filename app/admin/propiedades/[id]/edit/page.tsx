import { use } from "react";
import PropertyEditClient from "@/components/admin/PropertyEditClient";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // desenvuelve la promesa
  return <PropertyEditClient id={Number(id)} />;
}
