export interface CoverImageOption {
  /** Short label shown in the dropdown. */
  label: string;
  /** Full-resolution URL from churchofjesuschrist.org/imgs/. */
  url: string;
}

/**
 * Curated selection of Gospel Art Book images appropriate for a sacrament
 * meeting cover. All URLs are served directly from the Church's CDN and are
 * approved for ward/stake use; the user can still supply their own URL.
 *
 * Add more here as needed; the dropdown updates automatically.
 */
export const COVER_IMAGE_OPTIONS: CoverImageOption[] = [
  { label: '(No image)', url: '' },

  // Life of Christ (New Testament)
  { label: 'Christ\'s Image (Hofmann)', url: 'https://www.churchofjesuschrist.org/imgs/29decdc03cd7bb38441dde7d20b4b2dbd33a365e/full/!800,/0/default' },
  { label: 'The Sermon on the Mount', url: 'https://www.churchofjesuschrist.org/imgs/ca6877424dbe873aca9ff483e075ccad81a0d257/full/!800,/0/default' },
  { label: 'Christ and the Children', url: 'https://www.churchofjesuschrist.org/imgs/224a22b78a5e684a27207bbf29e60862dd2e55c3/full/!800,/0/default' },
  { label: 'The Good Samaritan', url: 'https://www.churchofjesuschrist.org/imgs/6d914c2c91c17e662a7b3bfb1ccce5db8066720e/full/!800,/0/default' },
  { label: 'Living Water (Samaritan Woman)', url: 'https://www.churchofjesuschrist.org/imgs/b01ff2f9ec4935557d58442b7443064b24f15a0c/full/!800,/0/default' },
  { label: 'Jesus at the Door', url: 'https://www.churchofjesuschrist.org/imgs/342168c6cfe8a02a338c16f7f47fcf73f5b8db2d/full/!800,/0/default' },
  { label: 'Jesus Shows His Wounds', url: 'https://www.churchofjesuschrist.org/imgs/d0f28b0da1a93cc7519c83d7f9d2d6cd4e0777b6/full/!800,/0/default' },
  { label: 'I See the Son of Man (Stephen)', url: 'https://www.churchofjesuschrist.org/imgs/877e23d4a93bfbc3e22bbd9813d23e92e09216ed/full/!800,/0/default' },
  { label: 'Christ and the Rich Young Ruler', url: 'https://www.churchofjesuschrist.org/imgs/d596d553c4da0b7aad4e540053a658d1853d67c9/full/!800,/0/default' },
  { label: 'Boy Jesus in the Temple', url: 'https://www.churchofjesuschrist.org/imgs/ab8563d6bf71f5fc940b8fc299018d764fed41b6/full/!800,/0/default' },
  { label: 'Simeon Reverencing the Christ Child', url: 'https://www.churchofjesuschrist.org/imgs/360b897adb52255989a7947d15a19ad178effbd0/full/!800,/0/default' },
  { label: 'In Remembrance of Me (Last Supper)', url: 'https://www.churchofjesuschrist.org/imgs/08e12942edd1eb30d5b73fc9093f730802916a70/full/!800,/0/default' },
  { label: 'Jesus Washing the Apostles\' Feet', url: 'https://www.churchofjesuschrist.org/imgs/5dd13429814877171e73770124984c8d2b580f0b/full/!800,/0/default' },
  { label: 'Christ Blessing Jairus\'s Daughter', url: 'https://www.churchofjesuschrist.org/imgs/424dc983fcd09ca127eb6c17324ef3cfea67d905/full/!800,/0/default' },
  { label: 'Christ in the Home of Mary and Martha', url: 'https://www.churchofjesuschrist.org/imgs/197ca5396b7590e37bb5a4aa6679ab08964527b9/full/!800,/0/default' },
  { label: 'Jesus Cleansing the Temple', url: 'https://www.churchofjesuschrist.org/imgs/9cbcf5d8edff6924977a99fb41d1f95f778c08aa/full/!800,/0/default' },
  { label: 'The Lost Lamb', url: 'https://www.churchofjesuschrist.org/imgs/d7c56202bd490636e35ad740fd120721fb45f850/full/!800,/0/default' },
  { label: 'The Annunciation (Angel Gabriel)', url: 'https://www.churchofjesuschrist.org/imgs/478780d23a8a4bac475b343341ab060f94b9d224/full/!800,/0/default' },
  { label: 'The Birth of Jesus', url: 'https://www.churchofjesuschrist.org/imgs/d2181d8fc63b27c70fa1c0385f5605c2f73b3965/full/!800,/0/default' },
  { label: 'The Road to Bethlehem', url: 'https://www.churchofjesuschrist.org/imgs/97605485b9a34a226983177701324fa6c3592120/full/!800,/0/default' },
  { label: 'The Ascension of Jesus', url: 'https://www.churchofjesuschrist.org/imgs/b54b00f6477654f9d2d478e83d2f897b7983d415/full/!800,/0/default' },
  { label: 'Christ\'s Triumphal Entry', url: 'https://www.churchofjesuschrist.org/imgs/369125355e962ccc569d249ca4e1e4a64ede2885/full/!800,/0/default' },
  { label: 'The Burial of Jesus', url: 'https://www.churchofjesuschrist.org/imgs/fc2a0f3226d307c23d3f8b5a492eb255e97028ef/full/!800,/0/default' },
  { label: 'My Father\'s House (Jerusalem Temple)', url: 'https://www.churchofjesuschrist.org/imgs/837a04ae1d6d5fcc6fef7df49aed3928c253e923/full/!800,/0/default' },

  // Book of Mormon (Jesus ministering in the Americas)
  { label: 'Christ and the Nephite Children', url: 'https://www.churchofjesuschrist.org/imgs/d4a5060c7dd3ca552d8a6bc0541f0b0555986926/full/!800,/0/default' },
  { label: 'Jesus Teaching in the Western Hemisphere', url: 'https://www.churchofjesuschrist.org/imgs/11c829db45dcde2b878d058d5e8a6bd24cd00158/full/!800,/0/default' },
  { label: 'And He Healed Them All Every One', url: 'https://www.churchofjesuschrist.org/imgs/57cc58bf56dab2577adde62729c43287131cb7fc/full/!800,/0/default' },
  { label: 'Christ Blesses Nephite Children (detail)', url: 'https://www.churchofjesuschrist.org/imgs/bab9bcba428f9dd114c41192a6ad7bc7e077ebb8/full/!800,/0/default' },
  { label: 'Alma Baptizes in the Waters of Mormon', url: 'https://www.churchofjesuschrist.org/imgs/dcb81af2e255165162761729ffd983d88d6d0f14/full/!800,/0/default' },
  { label: 'The Brother of Jared Sees the Finger of the Lord', url: 'https://www.churchofjesuschrist.org/imgs/797198058b55a8ccb0670050cf133be765b96045/full/!800,/0/default' },
  { label: 'Lehi\'s Dream', url: 'https://www.churchofjesuschrist.org/imgs/b819ab8ebea1cfd146a19114b446624043d27df5/full/!800,/0/default' },
  { label: 'The Liahona', url: 'https://www.churchofjesuschrist.org/imgs/66403ddb4d8d78e42d654c69ff5c75f7505e0f8f/full/!800,/0/default' },
  { label: 'King Benjamin Addresses His People', url: 'https://www.churchofjesuschrist.org/imgs/c502de1e5bd7bd69be5809c5bb5b81ee1a39255c/full/!800,/0/default' },
  { label: 'Samuel the Lamanite on the Wall', url: 'https://www.churchofjesuschrist.org/imgs/fd6fed42f33f62773befed9133128188c7b7e63e/full/!800,/0/default' },
  { label: 'Captain Moroni Raises the Title of Liberty', url: 'https://www.churchofjesuschrist.org/imgs/82ae65491dfe2a0d8b5555860b3468cd1ddd1682/full/!800,/0/default' },
  { label: 'Two Thousand Stripling Warriors', url: 'https://www.churchofjesuschrist.org/imgs/8b2594a23909b13fd69d5ea7b6ad4398362d5c25/full/!800,/0/default' },
  { label: 'Conversion of Alma the Younger', url: 'https://www.churchofjesuschrist.org/imgs/b38b1a93251273dbb6f223661fea333347ee0526/full/!800,/0/default' },
  { label: 'Enos Praying', url: 'https://www.churchofjesuschrist.org/imgs/d34f4ce49f85f655298a762984167ce4fce81d07/full/!800,/0/default' },
  { label: 'Moroni Hides the Plates in Cumorah', url: 'https://www.churchofjesuschrist.org/imgs/b417feb87c54637a74f67a51937ff2b4c8cdc6a1/full/!800,/0/default' },
  { label: 'Abinadi before King Noah', url: 'https://www.churchofjesuschrist.org/imgs/bc303ddc99f44c59f8c3b0743367f2180c9e91ef/full/!800,/0/default' },
  { label: 'Lehi\'s People Arrive in the Promised Land', url: 'https://www.churchofjesuschrist.org/imgs/83d8aee32f9f18d31bb3ed3ea6cc57ef129f483b/full/!800,/0/default' },

  // Old Testament
  { label: 'Isaiah Writes of Christ\'s Birth', url: 'https://www.churchofjesuschrist.org/imgs/75578c17fc349ebe9ac379f6a55792d377e7867a/full/!800,/0/default' },
  { label: 'Abraham and Isaac', url: 'https://www.churchofjesuschrist.org/imgs/ccabdc313a837a9e0537b157912f31eb67cb17b8/full/!800,/0/default' },
  { label: 'Moses and the Brass Serpent', url: 'https://www.churchofjesuschrist.org/imgs/e4d489d9f0d13fb89fe43727792594f46751a33f/full/!800,/0/default' },
  { label: 'Moses Receives the Tablets', url: 'https://www.churchofjesuschrist.org/imgs/1717b4abbd9b0264497cd9a7e8b1446193e75f69/full/!800,/0/default' },
  { label: 'David Slays Goliath', url: 'https://www.churchofjesuschrist.org/imgs/91a96141d4471eac93f6d58e7d6db42cd6fd4192/full/!800,/0/default' },
  { label: 'Daniel in the Lions\' Den', url: 'https://www.churchofjesuschrist.org/imgs/850c3faf9ed39b2193c9280a929f73469094982c/full/!800,/0/default' },
  { label: 'Three Men in the Fiery Furnace', url: 'https://www.churchofjesuschrist.org/imgs/53a6fcbb43da5fdb352d4e6e4c5e0f04a01bf1a0/full/!800,/0/default' },
  { label: 'Elijah Contends against the Priests of Baal', url: 'https://www.churchofjesuschrist.org/imgs/16ff5679f7d89bd0306573a5bfb98e674d60bc9a/full/!800,/0/default' },
  { label: 'Jonah', url: 'https://www.churchofjesuschrist.org/imgs/b1fb8b7649168e6b0aec7799b1cadf3dfe944018/full/!800,/0/default' },
  { label: 'Enoch and His People Taken Up to God', url: 'https://www.churchofjesuschrist.org/imgs/46d0e9f3be2677f5d47c66ea3c32414e182fba2e/full/!800,/0/default' },
  { label: 'The Lord Created All Things', url: 'https://www.churchofjesuschrist.org/imgs/31ab23f8042d48c2ae173a7126de4a7a35cf5604/full/!800,/0/default' },

  { label: 'Custom URL…', url: '__custom__' },
];
