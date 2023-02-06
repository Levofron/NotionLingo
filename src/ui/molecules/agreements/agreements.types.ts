export interface IAgreement {
  content: string;
  title: string | null;
}

export interface IAgreementsProps {
  agreements: IAgreement[];
  heading: string;
}
