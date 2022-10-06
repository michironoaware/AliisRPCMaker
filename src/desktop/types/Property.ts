export type Optional<T, K extends keyof T> = T & { [Property in K]?: T[Property]; };
export type Required<T, K extends keyof T> = T & { [Property in K]-?: T[Property]; };