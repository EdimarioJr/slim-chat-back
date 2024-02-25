export class BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: BaseEntity) {
    Object.assign(this, props);
  }
}
