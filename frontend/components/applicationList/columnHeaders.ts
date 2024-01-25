type ColumnHeaders = {
    applicationId: string;
    companyName: string;
    jobRole: string;
    sourceLinks: string;
    applicationDate: string;
    stateOfApplication: string;
    comments: string;
    [key: string]: string;
  };

export const columnHeaders: ColumnHeaders  = {
    applicationId: "Application Id",
    companyName: "Company Name",
    jobRole: "Job Role",
    sourceLinks: "Source Links",
    applicationDate: "Application Date",
    stateOfApplication: "State of Application",
    comments: "Comments",
  };