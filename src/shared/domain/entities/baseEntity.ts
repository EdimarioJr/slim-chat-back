export class BaseEntity {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(props: BaseEntity) {
    Object.assign(this, props);
  }
}
