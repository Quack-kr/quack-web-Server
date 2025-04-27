import { Injectable } from '@nestjs/common';
import { CreateSigninDto } from './dto/create-signin.dto';
import { UpdateSigninDto } from './dto/update-signin.dto';

@Injectable()
export class SigninService {
  public create(createSigninDto: CreateSigninDto) {
    return 'This action adds a new signin';
  }

  public findAll() {
    return `This action returns all signin`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} signin`;
  }

  public update(id: number, updateSigninDto: UpdateSigninDto) {
    return `This action updates a #${id} signin`;
  }

  public remove(id: number) {
    return `This action removes a #${id} signin`;
  }
}
