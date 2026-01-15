import { overThousandFormatter } from '../../utils/quantitiesFormatters';

describe('overThousandFormatter', () => {
  it('formats units (1)', () => {
    expect(overThousandFormatter.format(1)).toBe('1');
  });

  it('formats tens (10)', () => {
    expect(overThousandFormatter.format(10)).toBe('10');
  });

  it('formats hundreds (100)', () => {
    expect(overThousandFormatter.format(100)).toBe('100');
  });

  it('formats thousands (1500)', () => {
    expect(overThousandFormatter.format(1500)).toBe('1.5K');
  });

  it('formats millions (2500000)', () => {
    expect(overThousandFormatter.format(2500000)).toBe('2.5M');
  });

  it('formats billions (3500000000)', () => {
    expect(overThousandFormatter.format(3500000000)).toBe('3.5B');
  });
});
