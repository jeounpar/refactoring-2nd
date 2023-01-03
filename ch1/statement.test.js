// test("테스트 설명", () => {
//   expect("검증 대상").toXxx("기대 결과");
// });

const statement = require('./statement');
const invoices = require('./invoices.json');
const plays = require('./plays.json');

test('statement test-01', () => {
  expect(statement(invoices, plays)).toBe(
    '청구 내역 (고객명: BigCo)\n' +
      'Hamlet: $650.00 (55석)\n' +
      'As You Like it: $580.00 (35석)\n' +
      'Othello: $500.00 (40석)\n' +
      '총액: $1,730.00\n' +
      '적립포인트: 47점\n',
  );
});
