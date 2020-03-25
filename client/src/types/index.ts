export interface ClientSpends {
    _id: string;
    amount: number;
    merchant: string;
    clientId: string
    itemsPurchased: string;
    createdAt: string;
}

export interface Client {
    name: string;
    title: string;
    companyName: string
    address: string;
    industry: string;
    createdAt: string;
}

export interface User {
    _id: string;
    username: string;
    name: string;
}



