import { Test, TestingModule } from '@nestjs/testing';
import { ConexionController } from './conexion.controller';

describe('ConexionController', () => {
  let controller: ConexionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConexionController],
    }).compile();

    controller = module.get<ConexionController>(ConexionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
