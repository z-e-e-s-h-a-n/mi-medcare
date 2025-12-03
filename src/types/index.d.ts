interface SegmentParams {
  [key: string]: string;
}

type TSearchParams = Record<string, string | string[] | undefined>;

interface AppPageProps {
  params: Promise<SegmentParams>;
  searchParams: Promise<TSearchParams>;
}

interface AppLayoutProps {
  children?: React.ReactNode;
}
