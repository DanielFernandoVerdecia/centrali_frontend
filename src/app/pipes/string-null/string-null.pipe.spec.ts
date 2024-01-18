import { StringNullPipe } from './string-null.pipe';

describe('StringNullPipe', () => {
  it('create an instance', () => {
    const pipe = new StringNullPipe();
    expect(pipe).toBeTruthy();
  });
});
