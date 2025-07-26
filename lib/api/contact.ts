export interface ContactAddress {
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

export interface ContactInfo {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    facebook: string
    instagram: string
    youtube: string
    tiktok: string
    linkedin: string
    twitter: string
    email: string
    phoneNumber: string
    whatsapp: string
    googleMapUrl: string
    address: ContactAddress
    whatsAppGroups: any[]
}

class ContactAPI {
    private baseURL = "https://api.lag-services.com/api/v1"

    async getContactInfo(): Promise<ContactInfo> {
        const response = await fetch(`${this.baseURL}/contact`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch contact info: ${response.status}`)
        }

        return response.json()
    }
}

export const contactAPI = new ContactAPI()