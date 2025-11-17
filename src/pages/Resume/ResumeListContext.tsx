import { createContext, useContext, useMemo, useState } from "react";

const ResumeListContext = createContext(null);

export const useResumeListContext = () => {
  const context = useContext(ResumeListContext);
  if (!context) {
    throw new Error(
      "useResumeListContext must be used within a ResumeProvider"
    );
  }
  return context;
};

export type Resume = {
  resume_id: string;
  title: string;
  updated_at: string;
  created_at?: string;
  desc?: string;
  url?: string;
  end_date?: string;
};

export const ResumeListProvider = ({
  children,
  initialResumeListData,
}: {
  children: any;
  initialResumeListData: Resume[] | [];
}) => {
  const [resumes, setResumes] = useState<Resume[]>(initialResumeListData);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      resumes,
      setResumes,
      page,
      setPage,
      search,
      setSearch,
      hasMore,
      setHasMore,
    }),
    [resumes, page, search, isLoading, hasMore]
  );

  return (
    <ResumeListContext.Provider value={value}>
      {children}
    </ResumeListContext.Provider>
  );
};
