import { formatDate, checkIfSeller } from '../client/src/components/Questions&Answers/AnswerListEntry';

// API call is handled correctly

// <Question List /> renders correctly

// <QuestionListEntries />appear in order of helpfulness_score

// mapping of components handles empty/undefined props to render from

// answers appear in order helpfulness

// answers authored by seller show up first if they exist

// seller's answers are order by helpfulness

describe('checkIfSellers()', () => {
  test('returns returns unchanged input if it is not "Seller"', () => {
    expect(checkIfSeller('Aubrey')).toBe('Aubrey');
  });
  test('an input of "seller" is not confused with "Seller"', () => {
    expect(checkIfSeller('seller')).toBe('seller');
  });
});

describe('formatDate()', () => {
  test('returns date in "Month DD, YYYY" format', () => {
    expect(formatDate('2021-03-04T00:00:00.000Z')).toBe('March 3, 2021');
  });
});
