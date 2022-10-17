import { EntityBase, EntityGenerics } from "../entity/entity";

export interface DomainService {}

export interface DomainIFService<
  T extends EntityGenerics,
  E extends EntityBase<T>
> {
  get(id: string): Promise<E>;
  getList<F>(top: number, limit: number, filter: F);
  create(entity: E): Promise<E>;
  update(entity: E): Promise<E>;
  delete(id: string): Promise<E>;
}

export abstract class DomainServiceBase<
  T extends EntityGenerics,
  E extends EntityBase<T>,
  I extends DomainIFService<T, E>
> {
  constructor(protected ifService: I) {}
}
