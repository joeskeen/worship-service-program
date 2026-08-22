import { Program } from '../models/program.model';

export const DEFAULT_PROGRAM: Program = {
  cover: {
    churchName: 'The Church of Jesus Christ of Latter-day Saints',
    wardName: 'Sample Ward',
    date: 'Sunday, January 4, 2026',
    times: [
      { label: 'Sacrament Meeting', time: '10:00 am' },
      { label: 'Sunday School', time: '11:00 am' },
    ],
    scripture:
      '"Trust in the Lord with all thine heart; and lean not unto thine own understanding. ' +
      'In all thy ways acknowledge him, and he shall direct thy paths."',
    scriptureRef: '-- Proverbs 3:5-6',
    coverImage: '',
  },
  leadership: {
    presiding: 'Bishop John Smith',
    conducting: 'Counselor Jane Doe',
    organist: 'Sam Jones',
    chorister: 'Pat Williams',
  },
  orderOfService: [
    { kind: 'hymn', label: 'Opening Hymn', number: '#1', title: 'The Morning Breaks', note: '', people: [], lyrics: '', bold: false },
    { kind: 'prayer', label: 'Invocation', number: '', title: '', note: 'As Directed', people: [], lyrics: '', bold: false },
    { kind: 'business', label: '', number: '', title: 'Ward and Stake Business', note: '', people: [], lyrics: '', bold: false },
    { kind: 'hymn', label: 'Sacrament Hymn', number: '#2', title: 'Sabbath Hymn', note: '', people: [], lyrics: '', bold: false },
    { kind: 'sacrament', label: '', number: '', title: 'Administration of the Sacrament', note: '', people: [], lyrics: '', bold: false },
    { kind: 'speaker', label: 'Youth Speaker', number: '', title: '', note: '', people: ['Alex Lee'], lyrics: '', bold: false },
    { kind: 'speaker', label: 'Youth Speaker', number: '', title: '', note: '', people: ['Taylor Brown'], lyrics: '', bold: false },
    { kind: 'speaker', label: 'Speaker', number: '', title: '', note: '', people: ['Morgan Davis'], lyrics: '', bold: false },
    { kind: 'musical', label: 'Intermediate Hymn', number: '', title: 'Children\'s Song', note: '', people: [], lyrics: '', bold: false },
    { kind: 'speaker', label: 'Speaker 2', number: '', title: '', note: '', people: ['Casey Wilson'], lyrics: '', bold: false },
    { kind: 'hymn', label: 'Closing Hymn', number: '#3', title: 'Closing Hymn', note: '', people: [], lyrics: '', bold: false },
    { kind: 'prayer', label: 'Benediction', number: '', title: '', note: 'As Directed', people: [], lyrics: '', bold: false },
  ],
  calendar: [
    { date: 'Wednesday, January 7th \u00b7 6:00 - 7:30 PM', time: '', title: 'Sample Event - All Invited!', description: 'This is a placeholder description for a sample ward event. Replace with your own details.', bold: true },
    { date: 'Thursday, January 15th', time: '', title: 'Sample Activity - See handout for details.', description: '', bold: false },
    { date: 'Sunday, January 18th', time: '', title: 'Sample Meeting - Discuss schedule in second hour.', description: '', bold: false },
    { date: 'Monday, January 19th through Monday, February 16th', time: '', title: 'Sample closure notice.', description: '', bold: false },
    { date: 'Sunday, February 1st', time: '', title: 'Sample Testimony Meeting', description: '', bold: false },
  ],
  infoBlocks: [
    { title: 'Sample Class Title', body: 'Sample class description. Three sessions available:', bullets: ['Session One', 'Session Two', 'Session Three'] },
    { title: 'Sample Announcement', body: 'This is a placeholder announcement body. Replace with your own text.', bullets: [] },
  ],
  announcements: [
    { title: 'Sample Announcement Title', body: 'This is a sample announcement body. Replace with your own content.', link: '', linkLabel: '' },
    { title: 'Sample Contact Notice', body: 'For sample contact information, please reach out at', link: 'tel:5555550100', linkLabel: '555.555.0100' },
    { title: 'Sample Submission Notice', body: 'Sample submission instructions go here. Replace with your own text.', link: 'mailto:example@example.com', linkLabel: 'example@example.com' },
  ],
  externalEventsUrl: 'https://www.example.com',
  externalEventsNote: 'Sample external events link - replace with your own URL:',
  contacts: [
    { role: 'Bishop', name: 'John Smith', phone: '555.555.0101', email: '' },
    { role: '1st Counselor', name: 'Jane Doe', phone: '555.555.0102', email: '' },
    { role: '2nd Counselor', name: 'Sam Jones', phone: '555.555.0103', email: '' },
    { role: 'Executive Secretary', name: 'Pat Williams', phone: '555.555.0104', email: 'example@example.com' },
    { role: 'Ward Clerk', name: 'Alex Lee', phone: '555.555.0105', email: '' },
    { role: 'Elders Quorum Pres.', name: 'Taylor Brown', phone: '555.555.0106', email: '' },
    { role: 'Relief Society Pres.', name: 'Morgan Davis', phone: '555.555.0107', email: '' },
    { role: 'Primary Pres.', name: 'Casey Wilson', phone: '555.555.0108', email: '' },
    { role: 'Young Women Pres.', name: 'Jordan Miller', phone: '555.555.0109', email: '' },
  ],
};
