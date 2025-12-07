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
  BoardsTab: { screen?: keyof BoardStackParamList; params?: any };
  UsersTab: { screen?: keyof UserStackParamList; params?: any };
  AboutTab: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
