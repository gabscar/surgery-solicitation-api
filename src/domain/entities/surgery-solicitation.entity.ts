export class SurgerySolicitationEntity {
  id: string;
  code: string;
  room: string;
  procedures: string;
  doctor: string;
  hospital: string;
  surgery_date: Date;
  general_observations: string;
  patient: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(userProps: SurgerySolicitationEntity) {
    Object.assign(this, userProps);
  }
}
