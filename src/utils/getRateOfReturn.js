import {
  DEFAULT_NUM,
  LOTTO_TICKET_PRICE,
  PERCENTAGE,
} from '../constants/conditions.js';
import PRIZE from '../constants/rankingPrize.js';

export default function getRateOfReturn(matchingTable, purchaseAmount) {
  const inputMoney = purchaseAmount * LOTTO_TICKET_PRICE;
  let income = DEFAULT_NUM;
  Object.entries(matchingTable).forEach(([matchedCount, count]) => {
    income += PRIZE[matchedCount] * count;
  });

  return ((income / inputMoney) * PERCENTAGE).toFixed(1);
}