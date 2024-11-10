// import users from "data/users.json";
// import { User } from "next-auth";
// import { IUserService } from "./IUserService";

// export class InMemoryUserService implements IUserService {
//   signInCredentials(email: string, password: string): User | Promise<User> {
//     const user = users.find((user) => {
//       const emailFound = email === user.email;
//       const isPasswordCorrect = password === user.password;
//       const userFound = emailFound && isPasswordCorrect;
//       return userFound;
//     }) as User;

//     if (!user) {
//       throw new Error("Invalid email or password");
//     }

//     return user;
//   }
// }

// export const userService = new InMemoryUserService();

import bcrypt from "bcryptjs";
import User from "models/User";

// userService.js
export const userService = {
  async signInCredentials(email: any, password: any) {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    // If no user found or password is incorrect, return null
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    
    const { password: _, _id, ...userWithoutPassword } = user.toObject();
    
    // Return the user object with 'id' instead of '_id'
    return { ...userWithoutPassword, id: _id.toString() }; 
  }
};
