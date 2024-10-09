import { IObservableValue, ISubscriber } from '@/hadix-core/types/core';

export class ObservableValue<T> implements IObservableValue<T> {
  private value: T;
  private subscribers: Set<ISubscriber<T>>;

  constructor(value: T) {
    this.value = value;
    this.subscribers = new Set();
  }

  get(): T {
    return this.value;
  }

  set(value: T): void {
    this.value = value;
    this.subscribers.forEach(subscriber => subscriber(value));
  }

  subscribe(callback: ISubscriber<T>): () => void {
    this.subscribers.add(callback);
    callback(this.value); // 초기 상태 발행
    return () => this.subscribers.delete(callback);
  }

  unsubscribe(callback: ISubscriber<T>): void {
    this.subscribers.delete(callback);
  }
}

export const observableValue = <T>(value: T | IObservableValue<T>) => {
  if (isObservableValue(value)) {
    return value;
  }
  return new ObservableValue(value);
};

export const isObservableValue = <T>(
  value: unknown,
): value is IObservableValue<T> => {
  return value instanceof ObservableValue;
};
