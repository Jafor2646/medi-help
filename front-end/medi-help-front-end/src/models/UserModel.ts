class UserModel {
    userId: string;
    userName: string;
    email: string;
    password: string;
    address: string;
    phone?: string;
    userType: string;
    picture?: string;

    constructor(userId: string, userName: string, email: string, password: string, address: string, phone: string, userType: string, picture: string) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.userType = userType;
        this.picture = picture;
    }
}

export default UserModel;