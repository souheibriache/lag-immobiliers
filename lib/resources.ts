export interface Resource {
  id: number
  slug: string
  type: "book" | "product"
  title: string
  author?: string
  image: string
  images: string[]
  price: string
  originalPrice?: string
  rating: number
  reviews: number
  category: string
  bestseller?: boolean
  popular?: boolean
  features: string[]
  fullDescription: string
  tableOfContents?: string[]
  specifications?: { [key: string]: string }
  amazonLink: string
  downloadLink?: string
  previewLink?: string
  tags: string[]
}

export const resources: Resource[] = [
  {
    id: 1,
    slug: "guide-investissement-immobilier-2024",
    type: "book",
    title: "Guide de l'investissement immobilier 2024",
    author: "Jean Dupont",
    image: "/placeholder.svg?height=200&width=150&text=Investment+Guide",
    images: [
      "/placeholder.svg?height=400&width=300&text=Book+Cover",
      "/placeholder.svg?height=400&width=300&text=Table+Contents",
      "/placeholder.svg?height=400&width=300&text=Sample+Page+1",
      "/placeholder.svg?height=400&width=300&text=Sample+Page+2",
    ],
    price: "24.99€",
    rating: 4.8,
    reviews: 127,
    category: "Investissement",
    bestseller: true,
    features: [
      "320 pages de contenu expert",
      "Stratégies d'investissement 2024",
      "Cas pratiques détaillés",
      "Outils de calcul inclus",
      "Mise à jour annuelle gratuite",
    ],
    fullDescription:
      "Le guide de référence pour réussir vos investissements immobiliers en 2024. Écrit par Jean Dupont, expert reconnu avec plus de 20 ans d'expérience, ce livre vous dévoile toutes les stratégies gagnantes pour constituer un patrimoine immobilier rentable. Découvrez les meilleures opportunités du marché, les pièges à éviter, et les techniques avancées pour optimiser vos rendements. Avec des cas pratiques réels et des outils de calcul exclusifs, ce guide est votre compagnon indispensable pour investir intelligemment.",
    tableOfContents: [
      "Chapitre 1: Les fondamentaux de l'investissement immobilier",
      "Chapitre 2: Analyser le marché et identifier les opportunités",
      "Chapitre 3: Financement et optimisation fiscale",
      "Chapitre 4: Stratégies d'achat et de négociation",
      "Chapitre 5: Gestion locative et maximisation des revenus",
      "Chapitre 6: Revente et plus-values",
      "Annexes: Outils et calculateurs",
    ],
    amazonLink: "https://amazon.fr/guide-investissement-immobilier-2024",
    downloadLink: "https://lag-immobilier.fr/download/guide-2024",
    previewLink: "https://lag-immobilier.fr/preview/guide-2024",
    tags: ["Investissement", "Immobilier", "Finance", "Patrimoine", "Stratégie"],
  },
  {
    id: 2,
    slug: "strategies-location-rentable",
    type: "book",
    title: "Stratégies de location rentable",
    author: "Marie Martin",
    image: "/placeholder.svg?height=200&width=150&text=Rental+Strategies",
    images: [
      "/placeholder.svg?height=400&width=300&text=Book+Cover+2",
      "/placeholder.svg?height=400&width=300&text=Chapter+Preview",
      "/placeholder.svg?height=400&width=300&text=Case+Study",
      "/placeholder.svg?height=400&width=300&text=Tools+Section",
    ],
    price: "19.99€",
    rating: 4.6,
    reviews: 89,
    category: "Location",
    bestseller: false,
    features: [
      "250 pages d'expertise location",
      "Techniques de maximisation des loyers",
      "Gestion des locataires difficiles",
      "Modèles de contrats inclus",
      "Support client 6 mois",
    ],
    fullDescription:
      "Maîtrisez l'art de la location rentable avec ce guide complet de Marie Martin, gestionnaire immobilière experte. Apprenez à maximiser vos revenus locatifs, à sélectionner les meilleurs locataires, et à gérer efficacement votre parc immobilier. Ce livre contient des stratégies éprouvées, des modèles de contrats, et des conseils pratiques pour éviter les impayés et optimiser votre rentabilité.",
    tableOfContents: [
      "Partie 1: Préparer son bien pour la location",
      "Partie 2: Fixer le bon prix et attirer les locataires",
      "Partie 3: Sélection et gestion des locataires",
      "Partie 4: Optimisation fiscale et comptabilité",
      "Partie 5: Résolution des conflits et procédures",
    ],
    amazonLink: "https://amazon.fr/strategies-location-rentable",
    downloadLink: "https://lag-immobilier.fr/download/strategies-location",
    previewLink: "https://lag-immobilier.fr/preview/strategies-location",
    tags: ["Location", "Gestion", "Rentabilité", "Locataires", "Revenus"],
  },
  {
    id: 3,
    slug: "suite-analyse-immobiliere-pro",
    type: "product",
    title: "Suite d'analyse immobilière Pro",
    image: "/placeholder.svg?height=160&width=200&text=Analysis+Kit",
    images: [
      "/placeholder.svg?height=400&width=600&text=Excel+Dashboard",
      "/placeholder.svg?height=400&width=600&text=Calculator+Tools",
      "/placeholder.svg?height=400&width=600&text=Reports+Sample",
      "/placeholder.svg?height=400&width=600&text=User+Guide",
    ],
    price: "49.99€",
    originalPrice: "79.99€",
    rating: 4.9,
    reviews: 234,
    category: "Outils Pro",
    popular: true,
    features: [
      "15 tableurs Excel professionnels",
      "Calculateurs de rentabilité avancés",
      "Modèles d'analyse de marché",
      "Guide d'utilisation détaillé",
      "Mises à jour gratuites à vie",
      "Support technique inclus",
    ],
    fullDescription:
      "La suite d'outils la plus complète pour analyser vos investissements immobiliers comme un professionnel. Cette collection de 15 tableurs Excel vous permet d'évaluer la rentabilité, d'analyser les marchés, de calculer les financements, et de générer des rapports détaillés. Utilisée par plus de 500 investisseurs professionnels, cette suite vous fait gagner des heures d'analyse et vous aide à prendre les meilleures décisions d'investissement.",
    specifications: {
      "Nombre de fichiers": "15 tableurs Excel",
      Compatibilité: "Excel 2016 et versions ultérieures",
      Langue: "Français",
      Support: "Email et vidéos tutoriels",
      "Mises à jour": "Gratuites à vie",
      Licence: "Usage personnel et professionnel",
    },
    amazonLink: "https://amazon.fr/suite-analyse-immobiliere",
    downloadLink: "https://lag-immobilier.fr/download/suite-pro",
    tags: ["Excel", "Analyse", "Calculateurs", "Rentabilité", "Outils"],
  },
  {
    id: 4,
    slug: "formation-video-masterclass",
    type: "product",
    title: "Formation vidéo masterclass",
    image: "/placeholder.svg?height=160&width=200&text=Video+Course",
    images: [
      "/placeholder.svg?height=400&width=600&text=Course+Preview",
      "/placeholder.svg?height=400&width=600&text=Video+Modules",
      "/placeholder.svg?height=400&width=600&text=Certificate",
      "/placeholder.svg?height=400&width=600&text=Bonus+Materials",
    ],
    price: "199.99€",
    originalPrice: "299.99€",
    rating: 4.8,
    reviews: 89,
    category: "Formation",
    popular: true,
    features: [
      "12 heures de vidéos HD",
      "8 modules de formation progressive",
      "Certificat professionnel",
      "Accès à vie à la plateforme",
      "Bonus: templates et outils",
      "Groupe privé d'entraide",
    ],
    fullDescription:
      "La formation vidéo la plus complète pour maîtriser l'investissement immobilier de A à Z. 12 heures de contenu premium avec des experts reconnus, des cas pratiques réels, et des stratégies avancées. Cette masterclass vous accompagne pas à pas dans votre parcours d'investisseur, de votre premier achat à la constitution d'un patrimoine diversifié. Accès à vie, certificat professionnel, et communauté privée d'investisseurs inclus.",
    specifications: {
      "Durée totale": "12 heures de vidéo",
      "Nombre de modules": "8 modules progressifs",
      "Qualité vidéo": "Full HD 1080p",
      Accès: "À vie sur tous vos appareils",
      Certificat: "Professionnel reconnu",
      Bonus: "Templates et outils exclusifs",
    },
    amazonLink: "https://amazon.fr/formation-masterclass",
    downloadLink: "https://lag-immobilier.fr/access/masterclass",
    tags: ["Formation", "Vidéo", "Masterclass", "Certificat", "Expert"],
  },
]

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug)
}

export function getResourceById(id: number): Resource | undefined {
  return resources.find((resource) => resource.id === id)
}

export function getAllResources(): Resource[] {
  return resources
}

export function getResourcesByType(type: "book" | "product"): Resource[] {
  return resources.filter((resource) => resource.type === type)
}

export function getFeaturedResources(limit = 4): Resource[] {
  return resources.slice(0, limit)
}
