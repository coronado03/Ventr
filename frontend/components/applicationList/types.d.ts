import { ApplicationList } from "@/types/api/applicationList";

export interface ApplicationListGridProps {
  data?: ApplicationList[];
  loading: boolean;
}

export interface ApplicationListItemProps {
  data: ApplicationList;
}