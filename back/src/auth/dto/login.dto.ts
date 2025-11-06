import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString() @Length(3, 50)
  username: string;

  @IsString() @Length(8, 255)
  password: string;
}
