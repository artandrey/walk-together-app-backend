export interface IEntitySetup<E = unknown, CrE = unknown, UpE = unknown> {
  entity: E;
  create: CrE;
  update: UpE;
}

export interface IBaseRepository<E extends IEntitySetup, Pk> {
  create(entity: E['create']): Promise<E['entity']>;
  findById(id: Pk): Promise<E['entity']>;
  update(id: Pk, updatedEntity: E['update']): Promise<E['entity']>;
  delete(id: Pk): Promise<void>;
}
