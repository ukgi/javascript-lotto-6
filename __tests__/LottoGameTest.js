import LottoGame from '../src/LottoGame';

describe('로또 게임 테스트', () => {
  test.each([
    {
      autoLottos: [[1, 2, 3, 4, 5, 6]],
      winningLotto: [7, 8, 9, 10, 11, 12],
      bonus: 13,
      expected: [0],
    },
    {
      autoLottos: [
        [2, 7, 12, 14, 32, 41],
        [3, 16, 23, 30, 32, 43],
      ],
      winningLotto: [3, 30, 32, 12, 1, 7],
      bonus: 41,
      expected: [3, 3],
    },
    {
      autoLottos: [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
      ],
      winningLotto: [1, 2, 3, 12, 13, 14],
      bonus: 41,
      expected: [3, 1],
    },
  ])(
    '당첨번호와 각각의 로또번호를 비교하여 일치갯수를 저장한다.',
    ({ autoLottos, winningLotto, bonus, expected }) => {
      const lottoGame = new LottoGame(autoLottos, winningLotto, bonus);

      expect(lottoGame.getWinningResult()).toEqual(expected);
    },
  );

  test.each([
    {
      autoLottos: [
        [2, 7, 12, 14, 32, 41],
        [3, 16, 23, 30, 32, 43],
      ],
      winningLotto: [2, 7, 12, 14, 32, 43],
      bonus: 41,
      expected: [[5, true], 2],
    },
  ])(
    '5개가 일치하고 보너스 번호가 일치합니다.',
    ({ autoLottos, winningLotto, bonus, expected }) => {
      const lottoGame = new LottoGame(autoLottos, winningLotto, bonus);

      expect(lottoGame.getWinningResult()).toEqual(expected);
    },
  );

  test.each([
    {
      autoLottos: [
        [2, 7, 12, 14, 32, 41],
        [3, 16, 23, 30, 32, 43],
      ],
      winningLotto: [2, 7, 12, 14, 32, 43],
      bonus: 39,
      expected: [[5, false], 2],
    },
  ])(
    '5개가 일치하고 보너스 번호가 일치하지 않습니다.',
    ({ autoLottos, winningLotto, bonus, expected }) => {
      const lottoGame = new LottoGame(autoLottos, winningLotto, bonus);

      expect(lottoGame.getWinningResult()).toEqual(expected);
    },
  );
});

describe('수익 계산 테스트', () => {
  let auttoLottos;
  beforeEach(() => {
    auttoLottos = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ];
  });

  test('일치 갯수를 통해 수익을 계산합니다.', () => {
    const winningLotto = [1, 2, 3, 7, 8, 9];
    const bonus = 10;
    const lottoGame = new LottoGame(auttoLottos, winningLotto, bonus);
    lottoGame.getWinningResult();

    expect(lottoGame.getIncome()).toBe(10000);
  });

  test('3개이하로 일치하면 수익을 계산하지 않습니다.', () => {
    const winningLotto = [1, 2, 7, 8, 40, 41];
    const bonus = 10;
    const lottoGame = new LottoGame(auttoLottos, winningLotto, bonus);
    lottoGame.getWinningResult();

    expect(lottoGame.getIncome()).toBe(0);
  });

  test('5개가 일치하고 보너스 번호가 일치하면 2등 수익입니다.', () => {
    const winningLotto = [1, 2, 3, 4, 5, 7];
    const bonus = 6;
    const lottoGame = new LottoGame(auttoLottos, winningLotto, bonus);
    lottoGame.getWinningResult();

    expect(lottoGame.getIncome()).toBe(30000000);
  });

  test('5개가 일치하고 보너스 번호가 일치하지 않으면 3등 수익입니다.', () => {
    const winningLotto = [1, 2, 3, 4, 5, 7];
    const bonus = 10;
    const lottoGame = new LottoGame(auttoLottos, winningLotto, bonus);
    lottoGame.getWinningResult();

    expect(lottoGame.getIncome()).toBe(1500000);
  });
});
