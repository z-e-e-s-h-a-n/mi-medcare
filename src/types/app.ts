declare global {
  interface SegmentParams {
    [key: string]: string;
  }

  type TSearchParams = Record<string, string | string[] | undefined>;

  interface AppPageProps<
    TParams extends SegmentParams = SegmentParams,
    TSParams extends TSearchParams = TSearchParams,
  > {
    params: Promise<TParams>;
    searchParams: Promise<TSParams>;
  }

  interface AppLayoutProps {
    children?: React.ReactNode;
  }

  type FormSectionType = "add" | 'update'

  interface BaseCUFormProps {
    entityId?: string;
    formType: FormSectionType;
  }
}

export { };
