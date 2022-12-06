import { Test, TestingModule } from '@nestjs/testing';
import { ConexionFacadeService } from './conexion.facade.service';

describe('ConexionFacadeService', () => {
  let service: ConexionFacadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConexionFacadeService],
    }).compile();

    service = module.get<ConexionFacadeService>(ConexionFacadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
