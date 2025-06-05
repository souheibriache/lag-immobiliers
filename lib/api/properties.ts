"use client"
interface PropertyAddress {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    city: string
    postalCode: string
    country: string
    addressLine1: string
    addressLine2: string
}

interface PropertyPrice {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    monthlyPrice: number
    chargesPrice: number
    dossierPrice: number
    ensurenceDepositPrice: number
    firstDepositPrice: number
}

interface PropertyCharacteristic {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    name: string
    value: string
}

interface PropertyImage {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    fullUrl: string
    name: string
    originalName: string
    placeHolder: string
    resourceType: string
    order: string
}

interface Property {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    title: string
    description: string
    googleMapUrl: string
    isFeatured: boolean
    address: PropertyAddress
    price: PropertyPrice
    characteristics: PropertyCharacteristic[]
    images: PropertyImage[]
}
interface PropertyFilters {
    page?: number
    limit?: number
    search?: string
    isFeatured?: boolean
    minPrice?: number
    maxPrice?: number
    city?: string
    propertyType?: string
}
interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    take: number
    totalPages?: number
}

const API_CONFIG = {
    USE_MOCK_DATA: false,
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.lag-services.com/api/v1",
    ENDPOINTS: {
        PROPERTIES: "/property",
        PROPERTY_BY_ID: (id: string) => `/property/${id}`,
        FILTERED_PROPERTIES: "/property/filter",
        PROPERTY_INTEREST: "/property-request"
    }
}

const MOCK_PROPERTIES: Property[] = [
    {
        id: "6b66b77c-d864-4139-b3ba-8bba650435a0",
        createdAt: "2025-06-02T21:01:11.976Z",
        updatedAt: "2025-06-03T09:59:09.690Z",
        deletedAt: null,
        title: "Appartement T2 moderne - Centre Poitiers",
        description: "Magnifique appartement T2 entièrement rénové au cœur de Poitiers. Idéal pour investissement locatif ou résidence principale. Proche de toutes commodités.",
        googleMapUrl: "https://maps.app.goo.gl/m8QyuVgh2YEoe2b78",
        isFeatured: true,
        address: {
            id: "cf0c7d07-4d44-4100-8e81-d2e908abac0f",
            createdAt: "2025-06-02T21:01:11.939Z",
            updatedAt: "2025-06-02T21:01:11.939Z",
            deletedAt: null,
            city: "Poitiers",
            postalCode: "86000",
            country: "France",
            addressLine1: "11 rue Raoul Follereau - Bâtiment C18 19 et 20",
            addressLine2: "A432 cité descarte - A - aile nord"
        },
        price: {
            id: "300068f7-b171-44e1-95b9-b03681f52fce",
            createdAt: "2025-06-03T06:20:16.731Z",
            updatedAt: "2025-06-03T06:20:16.731Z",
            deletedAt: null,
            monthlyPrice: 650,
            chargesPrice: 80,
            dossierPrice: 210,
            ensurenceDepositPrice: 650,
            firstDepositPrice: 650
        },
        characteristics: [
            {
                id: "088ff2e3-4e6e-4663-9935-ab3c47ec7ed3",
                createdAt: "2025-06-03T08:29:38.582Z",
                updatedAt: "2025-06-03T08:29:38.582Z",
                deletedAt: null,
                name: "Surface",
                value: "45m²"
            },
            {
                id: "e89be1a7-fe99-4385-8847-129ce9276968",
                createdAt: "2025-06-03T08:29:38.582Z",
                updatedAt: "2025-06-03T08:29:38.582Z",
                deletedAt: null,
                name: "Pièces",
                value: "2"
            },
            {
                id: "b573f103-c138-447f-8bd1-df1ee03464f4",
                createdAt: "2025-06-03T08:29:38.582Z",
                updatedAt: "2025-06-03T08:29:38.582Z",
                deletedAt: null,
                name: "Chambres",
                value: "1"
            },
            {
                id: "da658de6-9dba-4e65-a900-4213acb0af73",
                createdAt: "2025-06-03T09:59:09.709Z",
                updatedAt: "2025-06-03T09:59:09.709Z",
                deletedAt: null,
                name: "Salle de bain",
                value: "1"
            }
        ],
        images: [
            {
                id: "2793ab20-3620-4914-a5c0-8a89c7c34185",
                createdAt: "2025-06-03T08:03:50.887Z",
                updatedAt: "2025-06-03T08:03:50.912Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/6c3c0e9127e1a3f4291bd83a59fb535e.jpg",
                name: "6c3c0e9127e1a3f4291bd83a59fb535e.jpg",
                originalName: "pexels-pixabay-164522 (1).jpg",
                placeHolder: "6c3c0e9127e1a3f4291bd83a59fb535e.jpg",
                resourceType: "auto",
                order: "0"
            },
            {
                id: "2555f68e-ac1e-452f-8d7c-c0ec10e32404",
                createdAt: "2025-06-03T09:58:44.867Z",
                updatedAt: "2025-06-03T09:58:44.918Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/ad95ef611cac0b5ad81a941c7cec1f4d.jpeg",
                name: "ad95ef611cac0b5ad81a941c7cec1f4d.jpeg",
                originalName: "WhatsApp Image 2025-04-25 at 10.24.37 (1).jpeg",
                placeHolder: "ad95ef611cac0b5ad81a941c7cec1f4d.jpeg",
                resourceType: "auto",
                order: "1"
            }
        ]
    },
    {
        id: "7e822ab0-1e64-4780-8412-2cfcac4fb3ef",
        createdAt: "2025-05-28T15:34:00.868Z",
        updatedAt: "2025-06-03T10:03:29.528Z",
        deletedAt: null,
        title: "Appartement T3 spacieux - Quartier résidentiel",
        description: "Bel appartement T3 dans un quartier calme et résidentiel. Parfait pour une famille ou un investissement locatif. Proche des écoles et transports.",
        googleMapUrl: "https://maps.app.goo.gl/m8QyuVgh2YEoe2b78",
        isFeatured: true,
        address: {
            id: "cdf42cdf-ec10-4802-b813-2430768168a2",
            createdAt: "2025-05-28T15:34:00.845Z",
            updatedAt: "2025-05-28T15:34:00.845Z",
            deletedAt: null,
            city: "Poitiers",
            postalCode: "86000",
            country: "France",
            addressLine1: "11 rue Raoul Follereau - Bâtiment C18 19 et 20",
            addressLine2: "A432 cité descarte - A - aile nord"
        },
        price: {
            id: "9e9502de-e0f0-4487-b56e-2d3072ad4dc7",
            createdAt: "2025-05-28T15:34:00.881Z",
            updatedAt: "2025-05-28T15:34:00.881Z",
            deletedAt: null,
            monthlyPrice: 850,
            chargesPrice: 120,
            dossierPrice: 299,
            ensurenceDepositPrice: 850,
            firstDepositPrice: 850
        },
        characteristics: [
            {
                id: "5a748332-d647-4233-b484-32a752d83b90",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Chambres",
                value: "2"
            },
            {
                id: "surface-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Surface",
                value: "75m²"
            },
            {
                id: "pieces-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Pièces",
                value: "3"
            },
            {
                id: "bath-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Salle de bain",
                value: "1"
            }
        ],
        images: [
            {
                id: "45acfbc1-5bd8-4f5e-9547-5ee631a87687",
                createdAt: "2025-06-03T08:45:41.545Z",
                updatedAt: "2025-06-03T08:45:41.590Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/c06f748a2878191e8975d078764ce06c.png",
                name: "c06f748a2878191e8975d078764ce06c.png",
                originalName: "e657042208b31ee220615e2392866658 (1).png",
                placeHolder: "c06f748a2878191e8975d078764ce06c.png",
                resourceType: "auto",
                order: "0"
            },
            {
                id: "674384a8-4933-467a-8fcf-78879cbd92bc",
                createdAt: "2025-06-03T08:45:49.773Z",
                updatedAt: "2025-06-03T08:45:49.812Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/973603e7ece38a3bf812fd02efbdbf76.jpg",
                name: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                originalName: "pexels-pixabay-164522 (1).jpg",
                placeHolder: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                resourceType: "auto",
                order: "1"
            }
        ]
    },
    {
        id: "7e822ab0-1e64-4780-8412-2cfcac4fb3ef",
        createdAt: "2025-05-28T15:34:00.868Z",
        updatedAt: "2025-06-03T10:03:29.528Z",
        deletedAt: null,
        title: "Appartement T3 spacieux - Quartier résidentiel",
        description: "Bel appartement T3 dans un quartier calme et résidentiel. Parfait pour une famille ou un investissement locatif. Proche des écoles et transports.",
        googleMapUrl: "https://maps.app.goo.gl/m8QyuVgh2YEoe2b78",
        isFeatured: true,
        address: {
            id: "cdf42cdf-ec10-4802-b813-2430768168a2",
            createdAt: "2025-05-28T15:34:00.845Z",
            updatedAt: "2025-05-28T15:34:00.845Z",
            deletedAt: null,
            city: "Poitiers",
            postalCode: "86000",
            country: "France",
            addressLine1: "11 rue Raoul Follereau - Bâtiment C18 19 et 20",
            addressLine2: "A432 cité descarte - A - aile nord"
        },
        price: {
            id: "9e9502de-e0f0-4487-b56e-2d3072ad4dc7",
            createdAt: "2025-05-28T15:34:00.881Z",
            updatedAt: "2025-05-28T15:34:00.881Z",
            deletedAt: null,
            monthlyPrice: 850,
            chargesPrice: 120,
            dossierPrice: 299,
            ensurenceDepositPrice: 850,
            firstDepositPrice: 850
        },
        characteristics: [
            {
                id: "5a748332-d647-4233-b484-32a752d83b90",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Chambres",
                value: "2"
            },
            {
                id: "surface-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Surface",
                value: "75m²"
            },
            {
                id: "pieces-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Pièces",
                value: "3"
            },
            {
                id: "bath-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Salle de bain",
                value: "1"
            }
        ],
        images: [
            {
                id: "45acfbc1-5bd8-4f5e-9547-5ee631a87687",
                createdAt: "2025-06-03T08:45:41.545Z",
                updatedAt: "2025-06-03T08:45:41.590Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/c06f748a2878191e8975d078764ce06c.png",
                name: "c06f748a2878191e8975d078764ce06c.png",
                originalName: "e657042208b31ee220615e2392866658 (1).png",
                placeHolder: "c06f748a2878191e8975d078764ce06c.png",
                resourceType: "auto",
                order: "0"
            },
            {
                id: "674384a8-4933-467a-8fcf-78879cbd92bc",
                createdAt: "2025-06-03T08:45:49.773Z",
                updatedAt: "2025-06-03T08:45:49.812Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/973603e7ece38a3bf812fd02efbdbf76.jpg",
                name: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                originalName: "pexels-pixabay-164522 (1).jpg",
                placeHolder: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                resourceType: "auto",
                order: "1"
            }
        ]
    }
    , {
        id: "7e822ab0-1e64-4780-8412-2cfcac4fb3ef",
        createdAt: "2025-05-28T15:34:00.868Z",
        updatedAt: "2025-06-03T10:03:29.528Z",
        deletedAt: null,
        title: "Appartement T3 spacieux - Quartier résidentiel",
        description: "Bel appartement T3 dans un quartier calme et résidentiel. Parfait pour une famille ou un investissement locatif. Proche des écoles et transports.",
        googleMapUrl: "https://maps.app.goo.gl/m8QyuVgh2YEoe2b78",
        isFeatured: true,
        address: {
            id: "cdf42cdf-ec10-4802-b813-2430768168a2",
            createdAt: "2025-05-28T15:34:00.845Z",
            updatedAt: "2025-05-28T15:34:00.845Z",
            deletedAt: null,
            city: "Poitiers",
            postalCode: "86000",
            country: "France",
            addressLine1: "11 rue Raoul Follereau - Bâtiment C18 19 et 20",
            addressLine2: "A432 cité descarte - A - aile nord"
        },
        price: {
            id: "9e9502de-e0f0-4487-b56e-2d3072ad4dc7",
            createdAt: "2025-05-28T15:34:00.881Z",
            updatedAt: "2025-05-28T15:34:00.881Z",
            deletedAt: null,
            monthlyPrice: 850,
            chargesPrice: 120,
            dossierPrice: 299,
            ensurenceDepositPrice: 850,
            firstDepositPrice: 850
        },
        characteristics: [
            {
                id: "5a748332-d647-4233-b484-32a752d83b90",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Chambres",
                value: "2"
            },
            {
                id: "surface-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Surface",
                value: "75m²"
            },
            {
                id: "pieces-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Pièces",
                value: "3"
            },
            {
                id: "bath-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Salle de bain",
                value: "1"
            }
        ],
        images: [
            {
                id: "45acfbc1-5bd8-4f5e-9547-5ee631a87687",
                createdAt: "2025-06-03T08:45:41.545Z",
                updatedAt: "2025-06-03T08:45:41.590Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/c06f748a2878191e8975d078764ce06c.png",
                name: "c06f748a2878191e8975d078764ce06c.png",
                originalName: "e657042208b31ee220615e2392866658 (1).png",
                placeHolder: "c06f748a2878191e8975d078764ce06c.png",
                resourceType: "auto",
                order: "0"
            },
            {
                id: "674384a8-4933-467a-8fcf-78879cbd92bc",
                createdAt: "2025-06-03T08:45:49.773Z",
                updatedAt: "2025-06-03T08:45:49.812Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/973603e7ece38a3bf812fd02efbdbf76.jpg",
                name: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                originalName: "pexels-pixabay-164522 (1).jpg",
                placeHolder: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                resourceType: "auto",
                order: "1"
            }
        ]
    },    {
        id: "7e822ab0-1e64-4780-8412-2cfcac4fb3ef",
        createdAt: "2025-05-28T15:34:00.868Z",
        updatedAt: "2025-06-03T10:03:29.528Z",
        deletedAt: null,
        title: "Appartement T3 spacieux - Quartier résidentiel",
        description: "Bel appartement T3 dans un quartier calme et résidentiel. Parfait pour une famille ou un investissement locatif. Proche des écoles et transports.",
        googleMapUrl: "https://maps.app.goo.gl/m8QyuVgh2YEoe2b78",
        isFeatured: true,
        address: {
            id: "cdf42cdf-ec10-4802-b813-2430768168a2",
            createdAt: "2025-05-28T15:34:00.845Z",
            updatedAt: "2025-05-28T15:34:00.845Z",
            deletedAt: null,
            city: "Poitiers",
            postalCode: "86000",
            country: "France",
            addressLine1: "11 rue Raoul Follereau - Bâtiment C18 19 et 20",
            addressLine2: "A432 cité descarte - A - aile nord"
        },
        price: {
            id: "9e9502de-e0f0-4487-b56e-2d3072ad4dc7",
            createdAt: "2025-05-28T15:34:00.881Z",
            updatedAt: "2025-05-28T15:34:00.881Z",
            deletedAt: null,
            monthlyPrice: 850,
            chargesPrice: 120,
            dossierPrice: 299,
            ensurenceDepositPrice: 850,
            firstDepositPrice: 850
        },
        characteristics: [
            {
                id: "5a748332-d647-4233-b484-32a752d83b90",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Chambres",
                value: "2"
            },
            {
                id: "surface-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Surface",
                value: "75m²"
            },
            {
                id: "pieces-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Pièces",
                value: "3"
            },
            {
                id: "bath-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Salle de bain",
                value: "1"
            }
        ],
        images: [
            {
                id: "45acfbc1-5bd8-4f5e-9547-5ee631a87687",
                createdAt: "2025-06-03T08:45:41.545Z",
                updatedAt: "2025-06-03T08:45:41.590Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/c06f748a2878191e8975d078764ce06c.png",
                name: "c06f748a2878191e8975d078764ce06c.png",
                originalName: "e657042208b31ee220615e2392866658 (1).png",
                placeHolder: "c06f748a2878191e8975d078764ce06c.png",
                resourceType: "auto",
                order: "0"
            },
            {
                id: "674384a8-4933-467a-8fcf-78879cbd92bc",
                createdAt: "2025-06-03T08:45:49.773Z",
                updatedAt: "2025-06-03T08:45:49.812Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/973603e7ece38a3bf812fd02efbdbf76.jpg",
                name: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                originalName: "pexels-pixabay-164522 (1).jpg",
                placeHolder: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                resourceType: "auto",
                order: "1"
            }
        ]
    },
    {
        id: "7e822ab0-1e64-4780-8412-2cfcac4fb3ef",
        createdAt: "2025-05-28T15:34:00.868Z",
        updatedAt: "2025-06-03T10:03:29.528Z",
        deletedAt: null,
        title: "Appartement T3 spacieux - Quartier résidentiel",
        description: "Bel appartement T3 dans un quartier calme et résidentiel. Parfait pour une famille ou un investissement locatif. Proche des écoles et transports.",
        googleMapUrl: "https://maps.app.goo.gl/m8QyuVgh2YEoe2b78",
        isFeatured: true,
        address: {
            id: "cdf42cdf-ec10-4802-b813-2430768168a2",
            createdAt: "2025-05-28T15:34:00.845Z",
            updatedAt: "2025-05-28T15:34:00.845Z",
            deletedAt: null,
            city: "Poitiers",
            postalCode: "86000",
            country: "France",
            addressLine1: "11 rue Raoul Follereau - Bâtiment C18 19 et 20",
            addressLine2: "A432 cité descarte - A - aile nord"
        },
        price: {
            id: "9e9502de-e0f0-4487-b56e-2d3072ad4dc7",
            createdAt: "2025-05-28T15:34:00.881Z",
            updatedAt: "2025-05-28T15:34:00.881Z",
            deletedAt: null,
            monthlyPrice: 850,
            chargesPrice: 120,
            dossierPrice: 299,
            ensurenceDepositPrice: 850,
            firstDepositPrice: 850
        },
        characteristics: [
            {
                id: "5a748332-d647-4233-b484-32a752d83b90",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Chambres",
                value: "2"
            },
            {
                id: "surface-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Surface",
                value: "75m²"
            },
            {
                id: "pieces-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Pièces",
                value: "3"
            },
            {
                id: "bath-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Salle de bain",
                value: "1"
            }
        ],
        images: [
            {
                id: "45acfbc1-5bd8-4f5e-9547-5ee631a87687",
                createdAt: "2025-06-03T08:45:41.545Z",
                updatedAt: "2025-06-03T08:45:41.590Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/c06f748a2878191e8975d078764ce06c.png",
                name: "c06f748a2878191e8975d078764ce06c.png",
                originalName: "e657042208b31ee220615e2392866658 (1).png",
                placeHolder: "c06f748a2878191e8975d078764ce06c.png",
                resourceType: "auto",
                order: "0"
            },
            {
                id: "674384a8-4933-467a-8fcf-78879cbd92bc",
                createdAt: "2025-06-03T08:45:49.773Z",
                updatedAt: "2025-06-03T08:45:49.812Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/973603e7ece38a3bf812fd02efbdbf76.jpg",
                name: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                originalName: "pexels-pixabay-164522 (1).jpg",
                placeHolder: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                resourceType: "auto",
                order: "1"
            }
        ]
    }
    , {
        id: "7e822ab0-1e64-4780-8412-2cfcac4fb3ef",
        createdAt: "2025-05-28T15:34:00.868Z",
        updatedAt: "2025-06-03T10:03:29.528Z",
        deletedAt: null,
        title: "Appartement T3 spacieux - Quartier résidentiel",
        description: "Bel appartement T3 dans un quartier calme et résidentiel. Parfait pour une famille ou un investissement locatif. Proche des écoles et transports.",
        googleMapUrl: "https://maps.app.goo.gl/m8QyuVgh2YEoe2b78",
        isFeatured: true,
        address: {
            id: "cdf42cdf-ec10-4802-b813-2430768168a2",
            createdAt: "2025-05-28T15:34:00.845Z",
            updatedAt: "2025-05-28T15:34:00.845Z",
            deletedAt: null,
            city: "Poitiers",
            postalCode: "86000",
            country: "France",
            addressLine1: "11 rue Raoul Follereau - Bâtiment C18 19 et 20",
            addressLine2: "A432 cité descarte - A - aile nord"
        },
        price: {
            id: "9e9502de-e0f0-4487-b56e-2d3072ad4dc7",
            createdAt: "2025-05-28T15:34:00.881Z",
            updatedAt: "2025-05-28T15:34:00.881Z",
            deletedAt: null,
            monthlyPrice: 850,
            chargesPrice: 120,
            dossierPrice: 299,
            ensurenceDepositPrice: 850,
            firstDepositPrice: 850
        },
        characteristics: [
            {
                id: "5a748332-d647-4233-b484-32a752d83b90",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Chambres",
                value: "2"
            },
            {
                id: "surface-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Surface",
                value: "75m²"
            },
            {
                id: "pieces-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Pièces",
                value: "3"
            },
            {
                id: "bath-id-2",
                createdAt: "2025-06-03T10:03:29.537Z",
                updatedAt: "2025-06-03T10:03:29.537Z",
                deletedAt: null,
                name: "Salle de bain",
                value: "1"
            }
        ],
        images: [
            {
                id: "45acfbc1-5bd8-4f5e-9547-5ee631a87687",
                createdAt: "2025-06-03T08:45:41.545Z",
                updatedAt: "2025-06-03T08:45:41.590Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/c06f748a2878191e8975d078764ce06c.png",
                name: "c06f748a2878191e8975d078764ce06c.png",
                originalName: "e657042208b31ee220615e2392866658 (1).png",
                placeHolder: "c06f748a2878191e8975d078764ce06c.png",
                resourceType: "auto",
                order: "0"
            },
            {
                id: "674384a8-4933-467a-8fcf-78879cbd92bc",
                createdAt: "2025-06-03T08:45:49.773Z",
                updatedAt: "2025-06-03T08:45:49.812Z",
                deletedAt: null,
                fullUrl: "https://cdn.joy-it.fr/properties/973603e7ece38a3bf812fd02efbdbf76.jpg",
                name: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                originalName: "pexels-pixabay-164522 (1).jpg",
                placeHolder: "973603e7ece38a3bf812fd02efbdbf76.jpg",
                resourceType: "auto",
                order: "1"
            }
        ]
    }

]


class PropertyAPIService {


    async getAllProperties(): Promise<Property[]> {
        await this.simulateNetworkDelay()

        if (API_CONFIG.USE_MOCK_DATA) {
            return JSON.parse(JSON.stringify(MOCK_PROPERTIES))
        }

        return this.makeRequest<Property[]>(API_CONFIG.ENDPOINTS.PROPERTIES)
    }


    async getFilteredProperties(filters: PropertyFilters = {}): Promise<PaginatedResponse<Property>> {
        await this.simulateNetworkDelay()

        if (API_CONFIG.USE_MOCK_DATA) {
            const filtered = this.applyFilters(MOCK_PROPERTIES, filters)
            const limit = filters.limit || 10
            const page = filters.page || 1
            const offset = (page - 1) * limit
            const paginatedItems = filtered.slice(offset, offset + limit)
            const totalPages = Math.ceil(filtered.length / limit)

            return {
                items: JSON.parse(JSON.stringify(paginatedItems)),
                total: filtered.length,
                page,
                take: limit,
                totalPages
            }
        }
        const queryParams = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) queryParams.append(key, String(value))
        })

        const endpoint = `${API_CONFIG.ENDPOINTS.FILTERED_PROPERTIES}?${queryParams.toString()}`
        console.log("Fetching filtered properties from:", endpoint)
        return this.makeRequest<PaginatedResponse<Property>>(endpoint)
    }


    async getPropertyById(id: string): Promise<Property> {
        await this.simulateNetworkDelay()

        if (API_CONFIG.USE_MOCK_DATA) {
            const property = MOCK_PROPERTIES.find(p => p.id === id)
            if (!property) {
                throw new Error(`Property with ID ${id} not found`)
            }
            return JSON.parse(JSON.stringify(property))
        }

        return this.makeRequest<Property>(API_CONFIG.ENDPOINTS.PROPERTY_BY_ID(id))
    }


    async getFeaturedProperties(limit = 6): Promise<Property[]> {
        const result = await this.getFilteredProperties({
            isFeatured: true,
            limit
        })
        return result.items
    }


    async submitPropertyInterest(data: {
        propertyId: string
        name: string
        email: string
        phone: string
        message: string
    }): Promise<void> {
        await this.simulateNetworkDelay(200, 500)

        if (API_CONFIG.USE_MOCK_DATA) {
            console.log("Property interest submitted (demo mode):", data)
            return Promise.resolve()
        }

        await this.makeRequest<void>(API_CONFIG.ENDPOINTS.PROPERTY_INTEREST, {
            method: "POST",
            body: JSON.stringify(data),
        })
    }


    async searchProperties(query: string, limit = 20): Promise<Property[]> {
        const result = await this.getFilteredProperties({
            search: query,
            limit
        })
        return result.items
    }


    private async simulateNetworkDelay(min = 300, max = 800): Promise<void> {
        if (API_CONFIG.USE_MOCK_DATA) {
            const delay = Math.random() * (max - min) + min
            await new Promise(resolve => setTimeout(resolve, delay))
        }
    }


    private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        })

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }


    private applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
        let filtered = [...properties]
        if (filters.isFeatured !== undefined) {
            filtered = filtered.filter(p => p.isFeatured === filters.isFeatured)
        }
        if (filters.city) {
            filtered = filtered.filter(p =>
                p.address.city.toLowerCase().includes(filters.city!.toLowerCase())
            )
        }
        if (filters.minPrice) {
            filtered = filtered.filter(p => p.price.monthlyPrice >= filters.minPrice!)
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price.monthlyPrice <= filters.maxPrice!)
        }
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase()
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.address.city.toLowerCase().includes(searchTerm)
            )
        }

        return filtered
    }
}
export const propertyAPI = new PropertyAPIService()
export type {
    Property,
    PropertyAddress,
    PropertyPrice,
    PropertyCharacteristic,
    PropertyImage,
    PropertyFilters,
    PaginatedResponse
}