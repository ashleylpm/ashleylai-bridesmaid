export interface GalleryPhoto {
  src: string
  alt: string
  caption?: string
  rotation?: number
}

export interface BridesmaidConfig {
  name: string
  slug: string
  intro: string
  galleryPhotos: GalleryPhoto[]
}

export interface Config {
  wedding: {
    bride: string
    partner: string
    date: string
    dateDisplay: string
    venues: {
      morning: string
      night: string
    }
  }
  bridesmaids: Record<string, BridesmaidConfig>
  proposal: {
    noLabel: string
    dodgeMessages: string[]
  }
}

export const config: Config = {
  wedding: {
    bride: 'Ashley Lai',
    partner: 'Julian Chong',
    date: '2027-05-01T00:00:00+08:00',
    dateDisplay: 'May 1, 2027',
    venues: {
      morning: 'DUMC, Dream Center',
      night: 'Copper Mansion, PJ',
    },
  },

  bridesmaids: {
    annabel: {
      name: 'Annabel Tee',
      slug: 'annabel',
      intro: "I miss you so much. Thank you for always being so real with me — I honestly don't know how we ended up this close, but I love you.",
      galleryPhotos: [
        { src: '/photos/annabel/1.jpg', alt: 'A favourite memory', caption: 'One of my favourites', rotation: -2 },
        { src: '/photos/annabel/2.jpg', alt: 'Together', caption: 'Us being us', rotation: 3 },
        { src: '/photos/annabel/3.jpg', alt: 'A good day', caption: 'The best kind of day', rotation: -4 },
        { src: '/photos/annabel/4.jpg', alt: 'Smiles', caption: 'Always laughing', rotation: 2 },
      ],
    },
    lauren: {
      name: 'Lauren Lai',
      slug: 'lauren',
      intro: 'Thank you for being my only big sister, hehe love ya.',
      galleryPhotos: [
        { src: '/photos/lauren/1.jpg', alt: 'A favourite memory', caption: 'One of my favourites', rotation: 3 },
        { src: '/photos/lauren/2.jpg', alt: 'Together', caption: 'Us being us', rotation: -2 },
        { src: '/photos/lauren/3.jpg', alt: 'A good day', caption: 'The best kind of day', rotation: 1 },
        { src: '/photos/lauren/4.jpg', alt: 'Smiles', caption: 'Always laughing', rotation: -3 },
      ],
    },
    chelsea: {
      name: 'Chelsea Yeo',
      slug: 'chelsea',
      intro: 'Thank you for always saying yes. 5 peas in a pod forever.',
      galleryPhotos: [
        { src: '/photos/chelsea/1.jpg', alt: 'A favourite memory', caption: 'One of my favourites', rotation: -3 },
        { src: '/photos/chelsea/2.jpg', alt: 'Together', caption: 'Us being us', rotation: 2 },
        { src: '/photos/chelsea/3.jpg', alt: 'A good day', caption: 'The best kind of day', rotation: -1 },
        { src: '/photos/chelsea/4.jpg', alt: 'Smiles', caption: 'Always laughing', rotation: 4 },
      ],
    },
    alison: {
      name: 'Alison Lau',
      slug: 'alison',
      intro: "Here's to more fun and food adventures ahead.",
      galleryPhotos: [
        { src: '/photos/alison/1.jpg', alt: 'A favourite memory', caption: 'One of my favourites', rotation: 2 },
        { src: '/photos/alison/2.jpg', alt: 'Together', caption: 'Us being us', rotation: -3 },
        { src: '/photos/alison/3.jpg', alt: 'A good day', caption: 'The best kind of day', rotation: 4 },
        { src: '/photos/alison/4.jpg', alt: 'Smiles', caption: 'Always laughing', rotation: -2 },
      ],
    },
  },

  proposal: {
    noLabel: 'No',
    dodgeMessages: [
      'Nice try!',
      "You didn't think it was that easy, did you?",
      'Wrong answer, bestie.',
      'That button has other plans.',
      'Just say yes already!',
      'The answer is yes and you know it.',
      'Absolutely not. Try again.',
    ],
  },
}
