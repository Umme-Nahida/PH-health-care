"use client";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { ISpecialty } from "@/types/specialities.interface";
import { Check, ChevronsUpDown, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface DoctorsFilterProps {
  specialties: ISpecialty[];
}

const DoctorFilters = ({ specialties }: DoctorsFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  // ?speciality=Cardiology&speciality=Dermatology
  const [localSpecialties, setLocalSpecialties] = useState<string[]>(
    () => searchParams.getAll("specialties") || []
  );
  const [genderInput, setGenderInput] = useState(
    () => searchParams.get("gender") || ""
  );
  const [emailInput, setEmailInput] = useState(
    () => searchParams.get("email") || ""
  );
  const [contactNumberInput, setContactNumberInput] = useState(
    () => searchParams.get("contactNumber") || ""
  );

  const debouncedGender = useDebounce(genderInput, 300);
  const debouncedEmail = useDebounce(emailInput, 500);
  const debouncedContactNumber = useDebounce(contactNumberInput, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Update debounced fields
    if (debouncedGender) {
      params.set("gender", debouncedGender);
    } else {
      params.delete("gender");
    }

    if (debouncedEmail) {
      params.set("email", debouncedEmail);
    } else {
      params.delete("email");
    }

    if (debouncedContactNumber) {
      params.set("contactNumber", debouncedContactNumber);
    } else {
      params.delete("contactNumber");
    }

    // Reset to page 1 when filters change
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedGender, debouncedEmail, debouncedContactNumber]);

  const toggleSpecialty = (specialtyId: string) => {
    const newSelection = localSpecialties.includes(specialtyId)
      ? localSpecialties.filter((id) => id !== specialtyId)
      : [...localSpecialties, specialtyId];

    setLocalSpecialties(newSelection);
  };

  const applySpecialtyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("specialties");
    if (localSpecialties.length > 0) {
      localSpecialties.forEach((val) => params.append("specialties", val));
    }
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
    setOpen(false);
  };

  const clearAllFilters = () => {
    setGenderInput("");
    setEmailInput("");
    setContactNumberInput("");
    setLocalSpecialties([]);
    startTransition(() => {
      router.push(window.location.pathname);
    });
  };

  const activeFiltersCount =
    localSpecialties.length +
    (genderInput ? 1 : 0) +
    (emailInput ? 1 : 0) +
    (contactNumberInput ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Specialties Multi-Select */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-60 justify-between h-10"
            >
              <Filter className="mr-2 h-4 w-4" />
              {localSpecialties.length > 0
                ? `${localSpecialties.length} selected`
                : "Select specialties"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search specialties..." />
              <CommandList>
                <CommandEmpty>No specialty found.</CommandEmpty>
                <CommandGroup>
                  {specialties.map((specialty) => {
                    const isSelected = localSpecialties.includes(
                      specialty.title
                    );
                    return (
                      <CommandItem
                        key={specialty.id}
                        value={specialty.title}
                        onSelect={() => toggleSpecialty(specialty.title)}
                        className={isSelected ? "bg-accent" : ""}
                      >
                        <Checkbox checked={isSelected} className="mr-2" />
                        <span className={isSelected ? "font-medium" : ""}>
                          {specialty.title}
                        </span>
                        {isSelected && (
                          <Check className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
              <div className="p-2 border-t">
                <Button
                  onClick={applySpecialtyFilter}
                  className="w-full"
                  size="sm"
                  disabled={isPending}
                >
                  Apply Filter
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Gender Filter */}
        <Select
          value={genderInput}
          onValueChange={(value) =>
            setGenderInput(value === "all" ? "" : value)
          }
          disabled={isPending}
        >
          <SelectTrigger className="w-[140px] h-10">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
          </SelectContent>
        </Select>

        {/* Email Filter */}
        <Input
          type="email"
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="w-[200px] h-10"
          disabled={isPending}
        />

        {/* Contact Number Filter */}
        <Input
          type="text"
          placeholder="Contact"
          value={contactNumberInput}
          onChange={(e) => setContactNumberInput(e.target.value)}
          className="w-40 h-10"
          disabled={isPending}
        />

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            disabled={isPending}
            className="h-10 px-3"
          >
            <X className="h-4 w-4 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Row 3: Active Specialty Badges - Fixed Height to Prevent Shift */}

      {localSpecialties.length > 0 && (
        <div className="min-h-8 flex items-center">
          <div className="flex flex-wrap gap-2">
            {localSpecialties.map((specialtyTitle) => (
              <Badge
                key={specialtyTitle}
                variant="outline"
                className="px-2.5 py-1 h-7"
              >
                {specialtyTitle}
                <Button
                  variant="ghost"
                  onClick={() => toggleSpecialty(specialtyTitle)}
                  className="ml-1.5 hover:text-destructive transition-colors"
                  aria-label={`Remove ${specialtyTitle}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorFilters;