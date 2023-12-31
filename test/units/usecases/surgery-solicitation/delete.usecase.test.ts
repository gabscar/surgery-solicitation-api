import { SurgerySolicitationErrors } from 'src/domain/errors/surgery-solicitation.error';
import { left, right } from 'src/domain/interfaces/common/either';
import { DeleteSurgerySolicitationUseCase } from 'src/useCases/surgery-solicitation/delete.usecase';
import { SurgeryEntityMock } from 'test/mocks/entities/surgery-solicitation.entity.mock';
import {
  ICreateSurgerySolicitationMocks,
  createSurgerySolicitationsMocks,
} from 'test/mocks/factories/surgery-solicitation.factory.mock';

describe('delete user use case -  when DeleteSurgerySolicitationUseCase is executed', () => {
  let usedMocks: ICreateSurgerySolicitationMocks;
  let sut: DeleteSurgerySolicitationUseCase;
  const user = SurgeryEntityMock.create();
  function initMocks() {
    usedMocks = createSurgerySolicitationsMocks();
  }
  function initSut() {
    sut = usedMocks.useCases.deleteSurgerySolicitationUseCase;
  }
  function initSetUpMocks() {
    const { spies } = usedMocks.services.findBySurgerySolicitationEntityService;
    spies.executeSpy.mockResolvedValue(right(user));
  }

  beforeEach(() => {
    initMocks();
    initSut();
    initSetUpMocks();
  });

  test('it should call the execute method from FindByUserEntityService with correct params', async () => {
    const { executeSpy } =
      usedMocks.services.findBySurgerySolicitationEntityService.spies;
    const result = await sut.execute(user.id);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
  });
  test('it Should return error if user is not founded', () => {
    const { spies } = usedMocks.services.findBySurgerySolicitationEntityService;
    spies.executeSpy.mockResolvedValueOnce(
      left(SurgerySolicitationErrors.notFound()),
    );

    const { executeSpy } =
      usedMocks.services.findBySurgerySolicitationEntityService.spies;

    const resultPromise = sut.execute(user.id);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(resultPromise).rejects.toThrow(SurgerySolicitationErrors.notFound());
  });
});
