import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDTO {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
