export interface ChangeUserPasswordInterface {
  userId: string
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface CompleteUserProfileInterface {
  userId: string
  phoneNumber: string
  address: string
  profession: string
  avatar: string
}
