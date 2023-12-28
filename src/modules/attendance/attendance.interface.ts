export interface ICreateStudentAttendance {
  code: string;
  attendance: boolean;
}

export interface IGetStudentAttendance {
  username: string;
  code: string;
  attendance: boolean;
}
