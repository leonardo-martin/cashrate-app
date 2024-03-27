import { GetUserDto } from 'src/users/dtos/get-user.dto';
import { User } from 'src/users/user.entity';

export function getUsersFormatted(users: User[]): GetUserDto[] {
  const usersFormatted = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  return usersFormatted;
}

export function getSingleUserFormatted(user: User): GetUserDto {
  const { email, name, id } = user;

  const userFormatted: GetUserDto = {
    id,
    name,
    email,
  };

  return userFormatted;
}
