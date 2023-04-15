export interface Agreement {
  content: string;
  title: string | null;
}

export interface AgreementsProps {
  agreements: Agreement[];
  heading: string;
}
