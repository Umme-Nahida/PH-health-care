import { ISpecialty } from "@/types/specialities.interface";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useTransition } from "react";

interface DoctorsFilterProps {
  specialties: ISpecialty[];
}



export const DoctorFilter = ({specialities}:{specialities: DoctorsFilterProps}) => {
 const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <div>DoctorFilter</div>
  )
}
