const UserResponseModel = (UserModel) =>{
  const userResponseModel = {
    email: UserModel.email,
    name: UserModel.name,
    createdAt: UserModel.createdAt,
    updatedAt: UserModel.updatedAt
  }
  return userResponseModel;
}

module.exports = UserResponseModel
