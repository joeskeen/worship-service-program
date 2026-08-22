export type ProgramItemKind =
  | 'hymn'
  | 'speaker'
  | 'musical'
  | 'prayer'
  | 'business'
  | 'sacrament'
  | 'testimony'
  | 'text';

export interface ProgramItem {
  kind: ProgramItemKind;
  label: string;
  number: string;
  title: string;
  note: string;
  people: string[];
  lyrics: string;
  bold: boolean;
}

export interface CalendarEvent {
  date: string;
  time: string;
  title: string;
  description: string;
  bold: boolean;
}

export interface Announcement {
  title: string;
  body: string;
  link: string;
  linkLabel: string;
}

export interface InfoBlock {
  title: string;
  body: string;
  bullets: string[];
}

export interface ServiceTime {
  label: string;
  time: string;
}

export interface CoverInfo {
  churchName: string;
  wardName: string;
  date: string;
  times: ServiceTime[];
  scripture: string;
  scriptureRef: string;
  coverImage: string;
}

export interface Leadership {
  presiding: string;
  conducting: string;
  organist: string;
  chorister: string;
}

export interface WardContact {
  role: string;
  name: string;
  phone: string;
  email: string;
}

export interface Program {
  cover: CoverInfo;
  leadership: Leadership;
  orderOfService: ProgramItem[];
  calendar: CalendarEvent[];
  infoBlocks: InfoBlock[];
  announcements: Announcement[];
  externalEventsUrl: string;
  externalEventsNote: string;
  contacts: WardContact[];
}

export function emptyProgramItem(kind: ProgramItemKind = 'hymn'): ProgramItem {
  return {
    kind,
    label: '',
    number: '',
    title: '',
    note: '',
    people: [],
    lyrics: '',
    bold: false,
  };
}

export function emptyCalendarEvent(): CalendarEvent {
  return { date: '', time: '', title: '', description: '', bold: false };
}

export function emptyAnnouncement(): Announcement {
  return { title: '', body: '', link: '', linkLabel: '' };
}

export function emptyInfoBlock(): InfoBlock {
  return { title: '', body: '', bullets: [] };
}

export function emptyServiceTime(): ServiceTime {
  return { label: '', time: '' };
}

export function emptyContact(): WardContact {
  return { role: '', name: '', phone: '', email: '' };
}
