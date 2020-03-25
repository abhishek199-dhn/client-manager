import getServices from "../services";
import {UserDoc} from "../models/Users";
import {ClientDoc} from "../models/Clients";
import {ClientTransactionDoc} from "../models/Transactions";

(async () => {
    const services = getServices();

    console.log("Adding dummy data");

    await services.UsersService.addUser(<UserDoc>{
        name: "Abhishek Kumar",
        password: "kumar",
        username: "abhishek"
    });

    await services.ClientsService.addClient(<ClientDoc>{
        name: "Vivek",
        title: "MD",
        companyName: "EarlySalary",
        address: "Pune",
        industry: "Fintech"
    });

    await services.ClientsService.addClient(<ClientDoc>{
        name: "Shubham",
        title: "Dev",
        companyName: "JohnDeere",
        address: "Pune",
        industry: "Machinery"
    });

    await services.TransactionsService.addTransaction(<ClientTransactionDoc>{
        amount: 5000,
        merchant: "Flipkart",
        clientId: "1",
        itemsPurchased: "PS4"
    });

    await services.TransactionsService.addTransaction(<ClientTransactionDoc>{
        amount: 480,
        merchant: "Amazon",
        clientId: "2",
        itemsPurchased: "MacBook Pro 2020"
    });

    console.log("Done adding dummy data");
    process.exit(0);
})()
