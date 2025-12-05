export type UserStackParamList = {
  UserListScreen: undefined;
  UserProfileScreen: { userEmail: string };
};

export type BoardStackParamList = {
  BoardListScreen: undefined;
  BoardDetailScreen: { boardKey: string };
  TaskDetailScreen: { taskKey: string };
};

export type RootTabParamList = {
  BoardsTab: undefined;
  UsersTab: undefined;
};
