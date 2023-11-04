import Bonus from '../src/Bonus';

describe('보너스 번호 테스트', () => {
  let winningLotto;
  beforeEach(() => {
    winningLotto = [1, 2, 3, 4, 5, 6];
  });

  test.each(['', ' ', 'a', 'abc', '1f', NaN])(
    '숫자를 입력하지 않으면 예외처리한다.',
    (input) => {
      expect(() => {
        Bonus.generateBonus(input, winningLotto);
      }).toThrow('[ERROR] 숫자만 입력해주세요.');
    },
  );

  test.each(['0', '46'])(
    '1부터 45사이의 수가 아니면 예외처리한다.',
    (input) => {
      expect(() => {
        Bonus.generateBonus(input, winningLotto);
      }).toThrow('[ERROR] 1부터 45사이의 수를 입력해주세요.');
    },
  );

  test('당첨번호와 보너스번호가 중복되면 예외처리한다.', () => {
    const bonus = 1;
    expect(() => {
      Bonus.generateBonus(bonus, winningLotto);
    }).toThrow('[ERROR] 당첨번호와 중복됩니다. 다시 입력해주세요.');
  });
});
