export function add(x: number, y: number) {
  return x + y;
}

describe('calculator', () => {
  it('add numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});

describe('mock', () => {
  it('mock implementation', () => {
    const fakeAdd = jest.fn().mockImplementation((a, b) => 5);
    expect(fakeAdd(1, 1)).toBe(5);
  });
});
