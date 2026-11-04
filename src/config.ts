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
      intro: "Thank you for always being so real with me, you\'re someone i really respect and can always count on, honestly don't know how we ended up this close, but our (low maintenance) friendship means alot to me. Constantly missing you soo much. More impromptu video calls and here's to more sleepovers, yo-chi and Japan trips together. With that being said...",
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
      intro: 'Thank you for being my only big sister and fetching me to MRT and cleaning the toilet lol. yay to room alone but missing the times that i can just randomly tell u stuff when i come home now i need to msg you, hehe love ya. With that being said...',
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
      intro: 'hello 6 peas in a pod rep hehe. wow wow cant believe how long our friendship has been, and now you gonna be a momma-to-be. Exciting chapters ahead for the both of us! Appreciate our friendship and thank you for being so kind and never fail to show that you care for me. Love ya lots. With that being said...',
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
      intro: "Thank you for always being my partner in crime and playing along with my stupidness lols. Love our low maintenance friednship even tho we dont talk for ages but when we meetup again we can yap non-stop. Here's to more fun and food adventures ahead, where to next hehe? With that being said...",
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
