import { Random } from '@woowacourse/mission-utils';
import autoLottoGenerator from '../src/utils/autoLottoGenerator';

const mockRandoms = (numbers) => {
  Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    Random.pickUniqueNumbersInRange,
  );
};

describe('자동 로또생성 테스트', () => {
  test('구매갯수를 입력하면 갯수에 맞게 로또를 자동생성하여 오름차순 정렬합니다', () => {
    const lottoCount = 2;
    mockRandoms([
      [6, 5, 4, 3, 2, 1],
      [16, 15, 14, 13, 12, 11],
    ]);

    expect(autoLottoGenerator(lottoCount)).toEqual([
      [1, 2, 3, 4, 5, 6],
      [11, 12, 13, 14, 15, 16],
    ]);
  });
});

describe('자동 로또 생성 오류 테스트', () => {
  test('구매한 갯수만큼 로또가 발행되지 않으면 예외처리', () => {
    const lottoCount = 3;
    mockRandoms([
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
    ]);

    expect(() => {
      autoLottoGenerator(lottoCount);
    }).toThrow('[ERROR] 로또가 제대로 발행되지 않았습니다. 다시 발행합니다.');
  });

  test('로또에 중복된 수가 있으면 예외처리', () => {
    const lottoCount = 3;
    mockRandoms([
      [7, 7, 7, 40, 42, 43],
      [2, 2, 22, 32, 38, 45],
    ]);

    expect(() => {
      autoLottoGenerator(lottoCount);
    }).toThrow('[ERROR] 로또가 제대로 발행되지 않았습니다. 다시 발행합니다.');
  });

  test('로또의 길이가 6개가 아니면 예외처리', () => {
    const lottoCount = 3;
    mockRandoms([
      [7, 11, 30, 40, 42, 43],
      [2, 2, 22, 32, 38, 45],
      [2, 2, 22, 32, 38],
    ]);

    expect(() => {
      autoLottoGenerator(lottoCount);
    }).toThrow('[ERROR] 로또가 제대로 발행되지 않았습니다. 다시 발행합니다.');
  });
});