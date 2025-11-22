// import SpecialitiesManagementHeader from "@/components/modules/Admin/SpecialitiesManagement/SpecialitiesManagementHeader";
import SpecialitiesManagementHeader from "@/components/modules/Admin/SpecialtiesManagement/SpecialitiesManagementHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";

const AdminSpecialitiesManagementPage = async () => {
  const result = await getSpecialities();
  return (
    <div className="space-y-6">
      <SpecialitiesManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      {/* <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialitiesTable specialities={result.data} />
      </Suspense> */}
    </div>
  );
};

export default AdminSpecialitiesManagementPage;