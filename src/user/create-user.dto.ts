export class CreateUserDto {
  readonly id?: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly password?: string;
  readonly fields?: { [key: string]: string | number };
}
