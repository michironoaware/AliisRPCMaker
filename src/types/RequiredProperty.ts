/**Set a property as not-optional */
export type RequiredProperty<T, K extends keyof T> = T & { [Property in K]-?: T[Property]; };