// import InputFieldError from "@/components/shared/InputFieldError";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Field, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { createDoctor, updateDoctor } from "@/services/admin/doctorManagement";
// import { IDoctor } from "@/types/doctor.interface";
// import { ISpecialty } from "@/types/specialities.interface";
// import { useActionState, useEffect, useState } from "react";
// import { toast } from "sonner";

// interface IDoctorFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
//   doctor?: IDoctor;
//   specialities?: ISpecialty[];
// }

// const DoctorFormDialog = ({
//   open,
//   onClose,
//   onSuccess,
//   doctor,
//   specialities,
// }: IDoctorFormDialogProps) => {
//   const isEdit = !!doctor;

//   const [selectedSpeciality, setSelectedSpeciality] = useState<string>("");
//   const [gender, setGender] = useState<"MALE" | "FEMALE">(
//     doctor?.gender || "MALE"
//   );

//   const [state, formAction, pending] = useActionState(
//     isEdit ? updateDoctor.bind(null, doctor.id!) : createDoctor,
//     null
//   );

//   useEffect(() => {
//     if (state?.success) {
//       toast.success(state.message);
//       onSuccess();
//       onClose();
//     } else if (state && !state.success) {
//       toast.error(state.message);
//     }
//   }, [state, onSuccess, onClose]);

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-h-[90vh] flex flex-col p-0">
//         <DialogHeader className="px-6 pt-6 pb-4">
//           <DialogTitle>{isEdit ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
//         </DialogHeader>

//         <form action={formAction} className="flex flex-col flex-1 min-h-0">
//           <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
//             <Field>
//               <FieldLabel htmlFor="name">Name</FieldLabel>
//               <Input
//                 id="name"
//                 name="name"
//                 placeholder="Dr. John Doe"
//                 defaultValue={isEdit ? doctor?.name : undefined}
//               />
//               <InputFieldError state={state} field="name" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="email">Email</FieldLabel>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="doctor@example.com"
//                 defaultValue={isEdit ? doctor?.email : undefined}
//                 disabled={isEdit}
//               />
//               <InputFieldError state={state} field="email" />
//             </Field>

//             {!isEdit && (
//               <>
//                 <Field>
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="Enter password"
//                   />
//                   <InputFieldError state={state} field="password" />
//                 </Field>

//                 <Field>
//                   <FieldLabel htmlFor="confirmPassword">
//                     Confirm Password
//                   </FieldLabel>
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="Confirm password"
//                   />
//                   <InputFieldError state={state} field="confirmPassword" />
//                 </Field>
//               </>
//             )}

//             <Field>
//               <FieldLabel htmlFor="specialities">Speciality</FieldLabel>
//               <Input
//                 id="specialities"
//                 name="specialities"
//                 placeholder="Select a speciality"
//                 // defaultValue={isEdit ? doctor?.doctorSpecialties?.[0]?.specialties?.title : ""}
//                 defaultValue={selectedSpeciality}
//                 type="hidden"
//               />
//               <Select
//                 value={
//                   //   isEdit
//                   //     ? doctor?.doctorSpecialties?.[0]?.specialties?.title || ""
//                   //     : selectedSpeciality
//                   selectedSpeciality
//                 }
//                 onValueChange={setSelectedSpeciality}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a speciality" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {specialities && specialities.length > 0 ? (
//                     specialities.map((speciality) => (
//                       <SelectItem key={speciality.id} value={speciality.title}>
//                         {speciality.title}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <SelectItem value="none" disabled>
//                       No specialities available
//                     </SelectItem>
//                   )}
//                 </SelectContent>
//               </Select>
//               <p className="text-xs text-gray-500 mt-1">
//                 Select a speciality for the doctor
//               </p>
//               <InputFieldError state={state} field="specialities" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
//               <Input
//                 id="contactNumber"
//                 name="contactNumber"
//                 placeholder="+1234567890"
//                 defaultValue={doctor?.contactNumber}
//               />
//               <InputFieldError state={state} field="contactNumber" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="address">Address</FieldLabel>
//               <Input
//                 id="address"
//                 name="address"
//                 placeholder="123 Main St, City, Country"
//                 defaultValue={isEdit ? doctor?.address : undefined}
//               />
//               <InputFieldError state={state} field="address" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="registrationNumber">
//                 Registration Number
//               </FieldLabel>
//               <Input
//                 id="registrationNumber"
//                 name="registrationNumber"
//                 placeholder="REG123456"
//                 defaultValue={isEdit ? doctor?.registrationNumber : undefined}
//               />
//               <InputFieldError state={state} field="registrationNumber" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="experience">
//                 Experience (in years)
//               </FieldLabel>
//               <Input
//                 id="experience"
//                 name="experience"
//                 type="number"
//                 placeholder="5"
//                 defaultValue={isEdit ? doctor?.experience : undefined}
//                 min="0"
//               />
//               <InputFieldError state={state} field="experience" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="gender">Gender</FieldLabel>
//               <Input
//                 id="gender"
//                 name="gender"
//                 placeholder="Select gender"
//                 defaultValue={gender}
//                 type="hidden"
//               />
//               <Select
//                 value={gender}
//                 onValueChange={(value) => setGender(value as "MALE" | "FEMALE")}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select gender" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="MALE">Male</SelectItem>
//                   <SelectItem value="FEMALE">Female</SelectItem>
//                 </SelectContent>
//               </Select>
//               <InputFieldError state={state} field="gender" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
//               <Input
//                 id="appointmentFee"
//                 name="appointmentFee"
//                 type="number"
//                 placeholder="100"
//                 defaultValue={isEdit ? doctor?.appointmentFee : undefined}
//                 min="0"
//               />
//               <InputFieldError state={state} field="appointmentFee" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
//               <Input
//                 id="qualification"
//                 name="qualification"
//                 placeholder="MBBS, MD"
//                 defaultValue={isEdit ? doctor?.qualification : undefined}
//               />
//               <InputFieldError state={state} field="qualification" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="currentWorkingPlace">
//                 Current Working Place
//               </FieldLabel>
//               <Input
//                 id="currentWorkingPlace"
//                 name="currentWorkingPlace"
//                 placeholder="City Hospital"
//                 defaultValue={isEdit ? doctor?.currentWorkingPlace : undefined}
//               />
//               <InputFieldError state={state} field="currentWorkingPlace" />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="designation">Designation</FieldLabel>
//               <Input
//                 id="designation"
//                 name="designation"
//                 placeholder="Senior Consultant"
//                 defaultValue={isEdit ? doctor?.designation : undefined}
//               />
//               <InputFieldError state={state} field="designation" />
//             </Field>

//             {!isEdit && (
//               <Field>
//                 <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
//                 <Input id="file" name="file" type="file" accept="image/*" />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Upload a profile photo for the doctor
//                 </p>
//                 <InputFieldError state={state} field="file" />
//               </Field>
//             )}
//           </div>

//           <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               disabled={pending}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={pending}>
//               {pending
//                 ? "Saving..."
//                 : isEdit
//                 ? "Update Doctor"
//                 : "Create Doctor"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default DoctorFormDialog;


import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSpecialtySelection } from "@/hooks/specialtyHooks/useSpecialtySelection";
import { createDoctor, updateDoctor } from "@/services/admin/doctorManagement";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialities.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SpecialtyMultiSelect from "./SpecialtyMultiSelect";
// import SpecialtyMultiSelect from "./SpecialtyMultiSelect";

interface IDoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctor?: IDoctor;
  specialities?: ISpecialty[];
}

const DoctorFormDialog = ({
  open,
  onClose,
  onSuccess,
  doctor,
  specialities,
}: IDoctorFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!doctor;

  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    doctor?.gender || "MALE"
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const [state, formAction, pending] = useActionState(
    isEdit ? updateDoctor.bind(null, doctor.id!) : createDoctor,
    null
  );

  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (selectedFile) {
      setSelectedFile(null); // Clear preview
    }
    formRef.current?.reset(); // Clear form
    onClose(); // Close dialog
  };

  console.log({ state });

  const specialtySelection = useSpecialtySelection({
    doctor,
    isEdit,
    open,
  });

  const getSpecialtyTitle = (id: string): string => {
    return specialities?.find((s) => s.id === id)?.title || "Unknown";
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);

      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. John Doe"
                defaultValue={
                  state?.formData?.name || (isEdit ? doctor?.name : "")
                }
              />
              <InputFieldError state={state} field="name" />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                // defaultValue={isEdit ? doctor?.email : undefined}
                defaultValue={
                  state?.formData?.email || (isEdit ? doctor?.email : "")
                }
                disabled={isEdit}
              />
              <InputFieldError state={state} field="email" />
            </Field>

            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    defaultValue={state?.formData?.password || ""}
                    placeholder="Enter password"
                  />
                  <InputFieldError state={state} field="password" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    defaultValue={state?.formData?.confirmPassword || ""}
                    placeholder="Confirm password"
                  />
                  <InputFieldError state={state} field="confirmPassword" />
                </Field>
              </>
            )}

            {/* Specialty Selection */}
            <SpecialtyMultiSelect
              selectedSpecialtyIds={specialtySelection.selectedSpecialtyIds}
              removedSpecialtyIds={specialtySelection.removedSpecialtyIds}
              currentSpecialtyId={specialtySelection.currentSpecialtyId}
              availableSpecialties={specialtySelection.getAvailableSpecialties(
                specialities!
              )}
              isEdit={isEdit}
              onCurrentSpecialtyChange={
                specialtySelection.setCurrentSpecialtyId
              }
              onAddSpecialty={specialtySelection.handleAddSpecialty}
              onRemoveSpecialty={specialtySelection.handleRemoveSpecialty}
              getSpecialtyTitle={getSpecialtyTitle}
              getNewSpecialties={specialtySelection.getNewSpecialties}
            />
            <InputFieldError field="specialties" state={state} />

            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+1234567890"
                // defaultValue={doctor?.contactNumber}
                defaultValue={
                  state?.formData?.contactNumber ||
                  (isEdit ? doctor?.contactNumber : "")
                }
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                // defaultValue={isEdit ? doctor?.address : undefined}
                defaultValue={
                  state?.formData?.address || (isEdit ? doctor?.address : "")
                }
              />
              <InputFieldError state={state} field="address" />
            </Field>

            <Field>
              <FieldLabel htmlFor="registrationNumber">
                Registration Number
              </FieldLabel>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="REG123456"
                // defaultValue={isEdit ? doctor?.registrationNumber : undefined}
                defaultValue={
                  state?.formData?.registrationNumber ||
                  (isEdit ? doctor?.registrationNumber : "")
                }
              />
              <InputFieldError state={state} field="registrationNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="experience">
                Experience (in years)
              </FieldLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
                // defaultValue={isEdit ? doctor?.experience : undefined}
                defaultValue={
                  state?.formData?.experience ||
                  (isEdit ? doctor?.experience : "")
                }
                min="0"
              />
              <InputFieldError state={state} field="experience" />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Input
                id="gender"
                name="gender"
                placeholder="Select gender"
                defaultValue={gender}
                // defaultValue={
                //   state?.formData?.gender || (isEdit ? doctor?.gender : "")
                // }
                type="hidden"
              />
              <Select
                value={gender}
                onValueChange={(value) => setGender(value as "MALE" | "FEMALE")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="gender" />
            </Field>

            <Field>
              <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
              <Input
                id="appointmentFee"
                name="appointmentFee"
                type="number"
                placeholder="100"
                defaultValue={isEdit ? doctor?.appointmentFee : undefined}
                min="0"
              />
              <InputFieldError state={state} field="appointmentFee" />
            </Field>

            <Field>
              <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD"
                // defaultValue={isEdit ? doctor?.qualification : undefined}
                defaultValue={
                  state?.formData?.qualification ||
                  (isEdit ? doctor?.qualification : "")
                }
              />
              <InputFieldError state={state} field="qualification" />
            </Field>

            <Field>
              <FieldLabel htmlFor="currentWorkingPlace">
                Current Working Place
              </FieldLabel>
              <Input
                id="currentWorkingPlace"
                name="currentWorkingPlace"
                placeholder="City Hospital"
                // defaultValue={isEdit ? doctor?.currentWorkingPlace : undefined}
                defaultValue={
                  state?.formData?.currentWorkingPlace ||
                  (isEdit ? doctor?.currentWorkingPlace : "")
                }
              />
              <InputFieldError state={state} field="currentWorkingPlace" />
            </Field>

            <Field>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <Input
                id="designation"
                name="designation"
                placeholder="Senior Consultant"
                // defaultValue={isEdit ? doctor?.designation : undefined}
                defaultValue={
                  state?.formData?.designation ||
                  (isEdit ? doctor?.designation : "")
                }
              />
              <InputFieldError state={state} field="designation" />
            </Field>

            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                {selectedFile && (
                  <Image
                    //get from state if available
                    src={
                      typeof selectedFile === "string"
                        ? selectedFile
                        : URL.createObjectURL(selectedFile)
                    }
                    alt="Profile Photo Preview"
                    width={50}
                    height={50}
                    className="mb-2 rounded-full"
                  />
                )}
                <Input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile photo for the doctor
                </p>
                <InputFieldError state={state} field="profilePhoto" />
              </Field>
            )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                ? "Update Doctor"
                : "Create Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorFormDialog;