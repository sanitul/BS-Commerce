export interface CustomerAddress {
    id?: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    isDefault?: boolean;
    company?: string;
    state?: string;
    country?: string;
    postCode?: string;
    phone: string;
    tag: string;
}

export interface Customer {
    id: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    addresses?: CustomerAddress[]
}