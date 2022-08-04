import { CustomerModel } from "./customer.model";

const customers = [
    {
        id: "574c0c31-e4cd-470b-a652-f964fb437b49",
        email: "james@gmail.com",
        password: "$2b$10$sb2uobqrj35xTlXqc1nree./fI5qYasjbQPx6ioeJH0GdTjAUCE/e", //plain password is "customer@123"
        otp: "123456",
    }
];

const seed = async () => {
    await CustomerModel.collection.drop();
    await CustomerModel.insertMany(customers);
    console.log('Completed Customer Data seeding');
};

export { seed };