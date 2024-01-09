import { ApplicationList } from "@/types/api/applicationList";

export interface ApplicationListGridProps {
  data?: ApplicationList[];
  loading: boolean;
  refetch: (filter?: string) => void;
}

export interface ApplicationListItemProps {
  data: ApplicationList;
}