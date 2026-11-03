export interface GalleryPhoto {
  src: string
  alt: string
}

export interface BridesmaidConfig {
  name: string
  slug: string
  intro: string
  galleryPhotos: GalleryPhoto[]
}

export interface Config {
  wedding: {
    partner: string
    venues: {
      morning: string
      morningLink?: string
      night: string
      nightLink?: string
    }
  }
  bridesmaids: Record<string, BridesmaidConfig>
  proposal: {
    noLabel: string
  }
}

export const config: Config = {
  wedding: {
    partner: 'Julian Chong',
    venues: {
      morning: 'DUMC Dream Center',
      morningLink: 'https://share.google/Fhpo704XSz7gbTodQ',
      night: 'Copper Mansion, PJ',
      nightLink: 'https://share.google/jew1XfurYSMYt3i6A',
    },
  },

  bridesmaids: {
    annabel: {
      name: 'Annabel Tee',
      slug: 'annabel',
      intro: "Thank you for always being so real with me, honestly don't know how we ended up this close, but our friendship means alot to me. Constantly missing you so much. Here's to more sleepovers, yo-chi and Japan trips together.",
      galleryPhotos: [
        { src: '/photos/annabel/1.jpg', alt: 'A favourite memory' },
        { src: '/photos/annabel/2.jpg', alt: 'Together' },
        { src: '/photos/annabel/3.jpg', alt: 'A good day' },
        { src: '/photos/annabel/4.jpg', alt: 'Smiles' },
      ],
    },
    lauren: {
      name: 'Lauren Lai',
      slug: 'lauren',
      intro: 'Thank you for being my only big sister, hehe love ya.',
      galleryPhotos: [
        { src: '/photos/lauren/1.jpg', alt: 'A favourite memory' },
        { src: '/photos/lauren/2.jpg', alt: 'Together' },
        { src: '/photos/lauren/3.jpg', alt: 'A good day' },
        { src: '/photos/lauren/4.jpg', alt: 'Smiles' },
      ],
    },
    chelsea: {
      name: 'Chelsea Yeo',
      slug: 'chelsea',
      intro: 'Yayy thank you for saying yes, despite being a soon-to-be-momma. 6 peas in a pod rep hehe yay.',
      galleryPhotos: [
        { src: '/photos/chelsea/1.jpg', alt: 'A favourite memory' },
        { src: '/photos/chelsea/2.jpg', alt: 'Together' },
        { src: '/photos/chelsea/3.jpg', alt: 'A good day' },
        { src: '/photos/chelsea/4.jpg', alt: 'Smiles' },
      ],
    },
    alison: {
      name: 'Alison Lau',
      slug: 'alison',
      intro: "Thank you for always being my partner in crime with me. Here's to more fun and food adventures ahead. Where to next hehe?",
      galleryPhotos: [
        { src: '/photos/alison/1.jpg', alt: 'A favourite memory' },
        { src: '/photos/alison/2.jpg', alt: 'Together' },
        { src: '/photos/alison/3.jpg', alt: 'A good day' },
        { src: '/photos/alison/4.jpg', alt: 'Smiles' },
      ],
    },
  },

  proposal: {
    noLabel: 'No',
  },
}
