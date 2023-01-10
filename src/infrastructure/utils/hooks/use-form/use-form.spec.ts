import { act, renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@infrastructure/utils';

import { useForm } from './use-form.hook';

describe('useForm hook', () => {
  functionImportTest(useForm);

  it('should return an object with the expected properties', () => {
    const { result } = renderHook(() => useForm({ initialValues: {} }));

    expect(result.current).toEqual({
      reset: expect.any(Function),
      formState: expect.any(Object),
      onSubmitWrapper: expect.any(Function),
      generateFieldProps: expect.any(Function),
    });
  });

  it('should change the form state when the handleInputChange function is called', () => {
    const { result } = renderHook(() => useForm({ initialValues: { name: 'John' } }));

    act(() => {
      result.current
        .generateFieldProps('name')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .onChange({ target: { name: 'name', value: 'Jane' } } as any);
    });

    expect(result.current.formState).toEqual({ name: 'Jane' });
  });

  it('should reset the form state when the reset function is called', () => {
    const { result } = renderHook(() => useForm({ initialValues: { name: 'John' } }));

    act(() => {
      result.current
        .generateFieldProps('name')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .onChange({ target: { name: 'name', value: 'Jane' } } as any);
    });

    expect(result.current.formState).toEqual({ name: 'Jane' });

    act(() => {
      result.current.reset();
    });

    expect(result.current.formState).toEqual({ name: 'John' });
  });

  it('should reset the form state when the reset function is called with a field name', () => {
    const { result } = renderHook(() => useForm({ initialValues: { name: 'John', age: 20 } }));

    act(() => {
      result.current
        .generateFieldProps('name')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .onChange({ target: { name: 'name', value: 'Jane' } } as any);
    });

    act(() => {
      result.current
        .generateFieldProps('age')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .onChange({ target: { name: 'age', value: 30 } } as any);
    });

    expect(result.current.formState).toEqual({ name: 'Jane', age: 30 });

    act(() => {
      result.current.reset('age');
    });

    expect(result.current.formState).toEqual({ name: 'Jane', age: 20 });
  });

  it('should return the expected field props when the generateFieldProps function is called', () => {
    const { result } = renderHook(() => useForm({ initialValues: { name: 'John' } }));

    expect(result.current.generateFieldProps('name')).toEqual({
      name: 'name',
      label: 'Name',
      value: 'John',
      errorMessage: undefined,
      placeholder: 'Your Name...',
      onChange: expect.any(Function),
    });
  });
});
