/* tslint:disable: no-console */
import * as shortid from 'shortid';
import { UserService } from './user/user.service';

export async function adminSeed(application) {
  try {
    const userService = application.get(UserService);
    const user = await userService.getUserByEmail('developers@cars45.com');
    if (user) {
      console.log('Admin User already exist');
      return;
    }

    const data = {
      firstname: 'Developers',
      lastname: 'Cars45',
      email: 'developers@cars45.com',
      password: shortid.generate(),
    };
    await userService.createUser(data);

    console.log('*'.repeat(20));
    console.log(data);
    console.log('*'.repeat(20));
  } catch (err) {
    console.error('Error seeding admin user >> ', err);
  }
}
