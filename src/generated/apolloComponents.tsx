import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  GeoJSONCoordinates: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  Time: any;
};

export type Query = {
  __typename?: 'Query';
  viewer: Viewer;
  getNotifications: NotificationList;
  getSupportChat?: Maybe<Chat>;
  getChatMessages: ChatMessageList;
  getChats: ChatList;
  getChat?: Maybe<Chat>;
  getViewerBadges?: Maybe<UserBadges>;
  getUsers?: Maybe<UserProfileList>;
  getUser?: Maybe<UserProfile>;
  getUserStats: UserStats;
  getComplaintCategories?: Maybe<Array<Maybe<ComplaintCategory>>>;
  getComplaints?: Maybe<ComplaintList>;
  getWallPosts?: Maybe<WallPostList>;
  getGeoPoints?: Maybe<GeoPointList>;
  getGeoPoint?: Maybe<GeoPoint>;
  getPlace?: Maybe<Place>;
  getPlaces?: Maybe<PlaceList>;
  getGames?: Maybe<GameList>;
  getGame?: Maybe<Game>;
  getBalanceTransactions?: Maybe<BalanceTransactionList>;
};


export type QueryGetNotificationsArgs = {
  filter: NotificationListFilter;
};


export type QueryGetChatMessagesArgs = {
  chatId: Scalars['ID'];
  pagination?: Maybe<Pagination>;
};


export type QueryGetChatsArgs = {
  filter?: Maybe<ChatFilter>;
  pagination?: Maybe<Pagination>;
};


export type QueryGetChatArgs = {
  id: Scalars['ID'];
  gameId?: Maybe<Scalars['ID']>;
};


export type QueryGetUsersArgs = {
  filter?: Maybe<UserFilter>;
  pagination?: Maybe<Pagination>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserStatsArgs = {
  id: Scalars['ID'];
};


export type QueryGetComplaintsArgs = {
  filter: ComplaintFilter;
  pagination?: Maybe<Pagination>;
};


export type QueryGetWallPostsArgs = {
  filter: WallPostFilter;
  pagination?: Maybe<Pagination>;
};


export type QueryGetGeoPointsArgs = {
  filter: GeoPointsFilter;
  pagination?: Maybe<Pagination>;
};


export type QueryGetGeoPointArgs = {
  id?: Maybe<Scalars['ID']>;
  gameId?: Maybe<Scalars['ID']>;
  placeId?: Maybe<Scalars['ID']>;
};


export type QueryGetPlaceArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryGetPlacesArgs = {
  filter: PlaceFilter;
  pagination?: Maybe<Pagination>;
};


export type QueryGetGamesArgs = {
  filter: GameFilter;
  pagination?: Maybe<Pagination>;
};


export type QueryGetGameArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryGetBalanceTransactionsArgs = {
  filter: BalanceTransactionFilter;
  pagination?: Maybe<Pagination>;
};

export type Viewer = User;

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  role?: Maybe<Scalars['String']>;
  phone: Phone;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['String']>;
  prefferedPosition?: Maybe<Scalars['String']>;
  beenOnlineAt?: Maybe<Scalars['Date']>;
  bannedAt?: Maybe<Scalars['Date']>;
  banReason?: Maybe<Scalars['String']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  ratingScore?: Maybe<Scalars['Float']>;
  ratingTotal?: Maybe<Scalars['Int']>;
  attendyScore?: Maybe<Scalars['Float']>;
  attendyTotal?: Maybe<Scalars['Int']>;
  checkinRating?: Maybe<Scalars['Float']>;
  avatar?: Maybe<File>;
  props?: Maybe<Scalars['JSON']>;
  commercialFrom?: Maybe<Scalars['Date']>;
  balance?: Maybe<Scalars['Float']>;
  identity?: Maybe<UserIdentity>;
};

export type Phone = {
  __typename?: 'Phone';
  countryCode?: Maybe<Scalars['Int']>;
  localNumber?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};


export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  userId?: Maybe<Scalars['ID']>;
  origin?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  url: Scalars['String'];
  mime?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
};


export type UserIdentity = {
  __typename?: 'UserIdentity';
  provider?: Maybe<Scalars['String']>;
  remoteId?: Maybe<Scalars['String']>;
};

export type NotificationListFilter = {
  event?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type NotificationList = {
  __typename?: 'NotificationList';
  rows?: Maybe<Array<Maybe<Notification>>>;
  count?: Maybe<Scalars['Int']>;
};

export type Notification = {
  __typename?: 'Notification';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  viewed?: Maybe<Scalars['Boolean']>;
  event?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  props?: Maybe<Scalars['JSON']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Chat = {
  __typename?: 'Chat';
  id?: Maybe<Scalars['ID']>;
  gameId?: Maybe<Scalars['ID']>;
  ownerId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  lastMessage?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<ChatMember>>>;
  viewer?: Maybe<ChatMember>;
  updatedAt?: Maybe<Scalars['Date']>;
  game?: Maybe<Game>;
};

export type ChatMember = {
  __typename?: 'ChatMember';
  chatId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  online?: Maybe<Scalars['Boolean']>;
  unread?: Maybe<Scalars['Int']>;
  user?: Maybe<UserProfile>;
  createdAt?: Maybe<Scalars['Date']>;
  deletedAt?: Maybe<Scalars['Date']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  avatar?: Maybe<File>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['String']>;
  prefferedPosition?: Maybe<Scalars['String']>;
  relation?: Maybe<Relation>;
  bannedAt?: Maybe<Scalars['Date']>;
  banReason?: Maybe<Scalars['String']>;
  ratingScore?: Maybe<Scalars['Float']>;
  ratingTotal?: Maybe<Scalars['Int']>;
  attendyScore?: Maybe<Scalars['Float']>;
  attendyTotal?: Maybe<Scalars['Int']>;
  checkinRating?: Maybe<Scalars['Float']>;
  commercialFrom?: Maybe<Scalars['Date']>;
};

export type Relation = {
  __typename?: 'Relation';
  userId?: Maybe<Scalars['ID']>;
  targetId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  rating2?: Maybe<Scalars['Int']>;
  rating3?: Maybe<Scalars['Int']>;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  reg?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  ageFrom?: Maybe<Scalars['Int']>;
  ageTo?: Maybe<Scalars['Int']>;
  gender?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  priceUnit?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  reserve?: Maybe<Scalars['Int']>;
  roundDuration?: Maybe<Scalars['Int']>;
  teamSeparation?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
  user?: Maybe<UserProfile>;
  placeId?: Maybe<Scalars['ID']>;
  place?: Maybe<Place>;
  ratingScore?: Maybe<Scalars['Int']>;
  ratingTotal?: Maybe<Scalars['Int']>;
  avatar?: Maybe<File>;
  members?: Maybe<Array<Maybe<GameMember>>>;
  deletedAt?: Maybe<Scalars['Date']>;
  commercial?: Maybe<Scalars['Boolean']>;
};

export type Place = {
  __typename?: 'Place';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  numberOfFields?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  roof?: Maybe<Scalars['Boolean']>;
  visitType?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  priceUnit?: Maybe<Scalars['String']>;
  fromTime?: Maybe<Scalars['Date']>;
  toTime?: Maybe<Scalars['Date']>;
  userId: Scalars['ID'];
  avatar?: Maybe<File>;
  files?: Maybe<Array<Maybe<File>>>;
  ratingScore?: Maybe<Scalars['Int']>;
  ratingTotal?: Maybe<Scalars['Int']>;
  userRating?: Maybe<PlaceRating>;
  commercial?: Maybe<Scalars['Boolean']>;
};

export type PlaceRating = {
  __typename?: 'PlaceRating';
  userId: Scalars['ID'];
  placeId: Scalars['ID'];
  rating?: Maybe<Scalars['Int']>;
};

export type GameMember = {
  __typename?: 'GameMember';
  gameId: Scalars['ID'];
  userId: Scalars['ID'];
  user: UserProfile;
  status: Scalars['String'];
  team?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  checkin?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Date']>;
  deletedAt?: Maybe<Scalars['Date']>;
};

export type Pagination = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ChatMessageList = {
  __typename?: 'ChatMessageList';
  rows: Array<Maybe<ChatMessage>>;
  count: Scalars['Int'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  id?: Maybe<Scalars['ID']>;
  chatId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  props?: Maybe<Scalars['JSON']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type ChatFilter = {
  text?: Maybe<Scalars['String']>;
  isSupport: Scalars['Boolean'];
};

export type ChatList = {
  __typename?: 'ChatList';
  rows: Array<Maybe<Chat>>;
  count: Scalars['Int'];
};

export type UserBadges = {
  __typename?: 'UserBadges';
  userId?: Maybe<Scalars['ID']>;
  messages?: Maybe<Scalars['Int']>;
  support?: Maybe<Scalars['Int']>;
};

export type UserFilter = {
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type UserProfileList = {
  __typename?: 'UserProfileList';
  rows: Array<Maybe<UserProfile>>;
  count: Scalars['Int'];
};

export type UserStats = {
  __typename?: 'UserStats';
  userId?: Maybe<Scalars['ID']>;
  followers?: Maybe<Scalars['Int']>;
  following?: Maybe<Scalars['Int']>;
  attendGames?: Maybe<Scalars['Int']>;
  orgGames?: Maybe<Scalars['Int']>;
};

export type ComplaintCategory = {
  __typename?: 'ComplaintCategory';
  id: Scalars['ID'];
  key?: Maybe<Scalars['String']>;
};

export type ComplaintFilter = {
  search?: Maybe<Scalars['String']>;
};

export type ComplaintList = {
  __typename?: 'ComplaintList';
  rows: Array<Maybe<Complaint>>;
  count: Scalars['Int'];
};

export type Complaint = {
  __typename?: 'Complaint';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  categoryId: Scalars['ID'];
  category?: Maybe<ComplaintCategory>;
  reporterId: Scalars['ID'];
  reporter?: Maybe<UserProfile>;
  targetUserId?: Maybe<Scalars['ID']>;
  targetUser?: Maybe<UserProfile>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type WallPostFilter = {
  wallType: Scalars['String'];
  userId: Scalars['ID'];
  search?: Maybe<Scalars['String']>;
};

export type WallPostList = {
  __typename?: 'WallPostList';
  rows: Array<Maybe<WallPost>>;
  count: Scalars['Int'];
};

export type WallPost = {
  __typename?: 'WallPost';
  userId: Scalars['ID'];
  postId: Scalars['ID'];
  wallType?: Maybe<Scalars['String']>;
  user?: Maybe<UserProfile>;
  post?: Maybe<Post>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  type: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  user: UserProfile;
  game?: Maybe<Game>;
  files?: Maybe<Array<Maybe<File>>>;
};

export type GeoPointsFilter = {
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  paidGames?: Maybe<Scalars['Boolean']>;
  freeGames?: Maybe<Scalars['Boolean']>;
  paidPlaces?: Maybe<Scalars['Boolean']>;
  freePlaces?: Maybe<Scalars['Boolean']>;
  center: Scalars['GeoJSONCoordinates'];
  latitudeDelta: Scalars['Float'];
  longitudeDelta: Scalars['Float'];
};


export type GeoPointList = {
  __typename?: 'GeoPointList';
  rows: Array<Maybe<GeoPoint>>;
  count: Scalars['Int'];
};

export type GeoPoint = {
  __typename?: 'GeoPoint';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['GeoJSONCoordinates']>;
  message?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
  placeId?: Maybe<Scalars['ID']>;
  gameId?: Maybe<Scalars['ID']>;
  user?: Maybe<UserProfile>;
  place?: Maybe<Place>;
  game?: Maybe<Game>;
};

export type PlaceFilter = {
  search?: Maybe<Scalars['String']>;
  commercial?: Maybe<Scalars['Boolean']>;
};

export type PlaceList = {
  __typename?: 'PlaceList';
  count: Scalars['Int'];
  rows?: Maybe<Array<Maybe<Place>>>;
};

export type GameFilter = {
  mode?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['GeoJSONCoordinates']>;
  radius?: Maybe<Scalars['Float']>;
  paid?: Maybe<Scalars['Boolean']>;
  free?: Maybe<Scalars['Boolean']>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  search?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['ID']>;
};

export type GameList = {
  __typename?: 'GameList';
  rows: Array<Maybe<Game>>;
  count: Scalars['Int'];
};

export type BalanceTransactionFilter = {
  userId?: Maybe<Scalars['ID']>;
};

export type BalanceTransactionList = {
  __typename?: 'BalanceTransactionList';
  rows: Array<Maybe<BalanceTransaction>>;
  count: Scalars['Int'];
  balance: Scalars['Float'];
};

export type BalanceTransaction = {
  __typename?: 'BalanceTransaction';
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
  gameId?: Maybe<Scalars['ID']>;
  placeId?: Maybe<Scalars['ID']>;
  game?: Maybe<Game>;
  paymentId?: Maybe<Scalars['String']>;
  paymentStatus?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn?: Maybe<Viewer>;
  logInSocial?: Maybe<Viewer>;
  logOut: RemovedEntry;
  signUp?: Maybe<User>;
  requestConfirmationCode: ConfirmationCodeType;
  checkConfirmationCode?: Maybe<Scalars['String']>;
  resetPassword?: Maybe<ConfirmationCodeType>;
  updateUser: User;
  upsertRelation: UserProfile;
  updateUserBan: UserProfile;
  setUserCommercial: UserProfile;
  openPrivateChat: Chat;
  createChatMessage?: Maybe<ChatMessage>;
  createComplaint?: Maybe<Complaint>;
  updateComplaint?: Maybe<Complaint>;
  createWallPost: Post;
  updateWallPost: Post;
  removeWallPost: RemovedEntry;
  upsertGeoPoint: GeoPoint;
  removeGeoPoint: RemovedEntry;
  upsertPlace: Place;
  removePlace: RemovedEntry;
  ratePlace: Place;
  upsertGame: Game;
  removeGame: RemovedEntry;
  upsertGameMember?: Maybe<Game>;
  removeGameMember?: Maybe<Game>;
  inviteToGame?: Maybe<Game>;
  checkinToGame?: Maybe<Game>;
  rateUser?: Maybe<UserProfile>;
  rateGame?: Maybe<Game>;
  createPayment: PaymentResult;
  consumePayment?: Maybe<Scalars['Float']>;
};


export type MutationLogInArgs = {
  credentials: ViewerCredentialsInput;
};


export type MutationLogInSocialArgs = {
  credentials: SocialCredentialsInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationRequestConfirmationCodeArgs = {
  login: Scalars['String'];
  type: ConfirmationCodeType;
};


export type MutationCheckConfirmationCodeArgs = {
  login: Scalars['String'];
  code: Scalars['String'];
  type: ConfirmationCodeType;
};


export type MutationResetPasswordArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
  confirmationCode: Scalars['String'];
  type: ConfirmationCodeType;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};


export type MutationUpsertRelationArgs = {
  targetId: Scalars['ID'];
  type: Scalars['String'];
};


export type MutationUpdateUserBanArgs = {
  id: Scalars['ID'];
  input?: Maybe<UserBanInput>;
};


export type MutationSetUserCommercialArgs = {
  id: Scalars['ID'];
  commercial?: Maybe<Scalars['Boolean']>;
};


export type MutationOpenPrivateChatArgs = {
  userId: Scalars['ID'];
  isSupport?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateChatMessageArgs = {
  chatId: Scalars['ID'];
  message: Scalars['String'];
};


export type MutationCreateComplaintArgs = {
  input: ComplaintInput;
};


export type MutationUpdateComplaintArgs = {
  id: Scalars['ID'];
  input?: Maybe<ComplaintInput>;
};


export type MutationCreateWallPostArgs = {
  input: WallPostInput;
};


export type MutationUpdateWallPostArgs = {
  postId: Scalars['ID'];
  input: WallPostInput;
};


export type MutationRemoveWallPostArgs = {
  postId: Scalars['ID'];
};


export type MutationUpsertGeoPointArgs = {
  input: GeoPointInput;
};


export type MutationRemoveGeoPointArgs = {
  id: Scalars['ID'];
};


export type MutationUpsertPlaceArgs = {
  id?: Maybe<Scalars['ID']>;
  input?: Maybe<PlaceInput>;
};


export type MutationRemovePlaceArgs = {
  id: Scalars['ID'];
};


export type MutationRatePlaceArgs = {
  placeId: Scalars['ID'];
  rating: Scalars['Int'];
};


export type MutationUpsertGameArgs = {
  id?: Maybe<Scalars['ID']>;
  input?: Maybe<GameInput>;
};


export type MutationRemoveGameArgs = {
  id: Scalars['ID'];
};


export type MutationUpsertGameMemberArgs = {
  input: GameMemberInput;
};


export type MutationRemoveGameMemberArgs = {
  gameId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationInviteToGameArgs = {
  gameId: Scalars['ID'];
  userIds: Array<Maybe<Scalars['ID']>>;
};


export type MutationCheckinToGameArgs = {
  input: CheckinInput;
};


export type MutationRateUserArgs = {
  userId?: Maybe<Scalars['ID']>;
  rating?: Maybe<Scalars['Int']>;
  rating2?: Maybe<Scalars['Int']>;
  rating3?: Maybe<Scalars['Int']>;
};


export type MutationRateGameArgs = {
  gameId?: Maybe<Scalars['ID']>;
  rating?: Maybe<Scalars['Int']>;
};


export type MutationCreatePaymentArgs = {
  input: PaymentInput;
};


export type MutationConsumePaymentArgs = {
  gameId: Scalars['ID'];
};

export type ViewerCredentialsInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type SocialCredentialsInput = {
  regType: Scalars['String'];
  socialID: Scalars['String'];
  socialToken: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type RemovedEntry = {
  __typename?: 'RemovedEntry';
  id: Scalars['ID'];
};

export type SignUpInput = {
  login?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phoneCountryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export enum ConfirmationCodeType {
  Email = 'email',
  Sms = 'sms'
}

export type UserInput = {
  role?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['Upload']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['String']>;
  prefferedPosition?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
};


export type UserBanInput = {
  bannedAt?: Maybe<Scalars['Date']>;
  bannedById?: Maybe<Scalars['ID']>;
  banReason?: Maybe<Scalars['String']>;
};

export type ComplaintInput = {
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['ID']>;
  targetId?: Maybe<Scalars['ID']>;
};

export type WallPostInput = {
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  gameId?: Maybe<Scalars['ID']>;
  files?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  removedFiles?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type GeoPointInput = {
  type?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['GeoJSONCoordinates']>;
  message?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
  gameId?: Maybe<Scalars['ID']>;
  placeId?: Maybe<Scalars['ID']>;
};

export type PlaceInput = {
  userId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  numberOfFields?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  roof?: Maybe<Scalars['Boolean']>;
  visitType?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  priceUnit?: Maybe<Scalars['String']>;
  fromTime?: Maybe<Scalars['Date']>;
  toTime?: Maybe<Scalars['Date']>;
  avatar?: Maybe<Scalars['Upload']>;
  filesToAdd?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  filesToRemove?: Maybe<Array<Maybe<Scalars['ID']>>>;
  location?: Maybe<Scalars['GeoJSONCoordinates']>;
};

export type GameInput = {
  status?: Maybe<Scalars['String']>;
  reg?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  ageFrom?: Maybe<Scalars['Int']>;
  ageTo?: Maybe<Scalars['Int']>;
  gender?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  priceUnit?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  reserve?: Maybe<Scalars['Int']>;
  roundDuration?: Maybe<Scalars['Int']>;
  teamSeparation?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['Upload']>;
  location?: Maybe<Scalars['GeoJSONCoordinates']>;
  placeId?: Maybe<Scalars['ID']>;
};

export type GameMemberInput = {
  gameId: Scalars['ID'];
  userId: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['String']>;
};

export type CheckinInput = {
  gameId: Scalars['ID'];
  location: Scalars['GeoJSONCoordinates'];
};

export type PaymentInput = {
  paymentId?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  gameId?: Maybe<Scalars['ID']>;
};

export type PaymentResult = {
  __typename?: 'PaymentResult';
  paymentId?: Maybe<Scalars['String']>;
  paymentStatus?: Maybe<Scalars['String']>;
  paymentRedirectUrl?: Maybe<Scalars['String']>;
  transaction?: Maybe<BalanceTransaction>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userChanged: User;
  viewerBadgesChanged: UserBadges;
  chatMessageAdded: ChatMessage;
  chatMemberCreated: Chat;
  chatMemberChanged: Chat;
  chatMemberRemoved: RemovedEntry;
  wallPostAdded: WallPost;
  wallPostChanged: WallPost;
  wallPostRemoved: RemovedEntry;
  geoPointAdded: GeoPoint;
  geoPointChanged: GeoPoint;
  geoPointRemoved: RemovedEntry;
  gameChanged: Game;
};


export type SubscriptionChatMessageAddedArgs = {
  chatId: Scalars['ID'];
};


export type SubscriptionChatMemberCreatedArgs = {
  isSupport: Scalars['Boolean'];
};


export type SubscriptionChatMemberChangedArgs = {
  isSupport: Scalars['Boolean'];
};


export type SubscriptionChatMemberRemovedArgs = {
  isSupport: Scalars['Boolean'];
};


export type SubscriptionWallPostAddedArgs = {
  userId: Scalars['ID'];
  wallType: Scalars['String'];
};


export type SubscriptionWallPostChangedArgs = {
  userId: Scalars['ID'];
  wallType: Scalars['String'];
};


export type SubscriptionWallPostRemovedArgs = {
  userId: Scalars['ID'];
  wallType: Scalars['String'];
};


export type SubscriptionGeoPointAddedArgs = {
  filter: GeoPointsFilter;
};


export type SubscriptionGeoPointChangedArgs = {
  filter: GeoPointsFilter;
};


export type SubscriptionGeoPointRemovedArgs = {
  filter: GeoPointsFilter;
};


export type SubscriptionGameChangedArgs = {
  gameId: Scalars['ID'];
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type DateRange = {
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
};

export enum SortDirection {
  Desc = 'DESC',
  Asc = 'ASC'
}

export type Sort = {
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
  direction?: Maybe<SortDirection>;
};

export type CreateFieldMutationVariables = Exact<{
  input: PlaceInput;
}>;


export type CreateFieldMutation = (
  { __typename?: 'Mutation' }
  & { upsertPlace: (
    { __typename?: 'Place' }
    & Pick<Place, 'id'>
  ) }
);

export type FieldQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FieldQuery = (
  { __typename?: 'Query' }
  & { getPlace?: Maybe<(
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'name' | 'description' | 'address' | 'roof' | 'price' | 'phone' | 'email' | 'size'>
  )> }
);

export type FieldsQueryVariables = Exact<{
  filter: PlaceFilter;
  pagination?: Maybe<Pagination>;
}>;


export type FieldsQuery = (
  { __typename?: 'Query' }
  & { getPlaces?: Maybe<(
    { __typename?: 'PlaceList' }
    & { rows?: Maybe<Array<Maybe<(
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'name' | 'description' | 'address' | 'roof' | 'price'>
    )>>> }
  )> }
);

export type RegUserFragment = (
  { __typename: 'User' }
  & Pick<User, 'id'>
);

export type LoginMutationVariables = Exact<{
  credentials: ViewerCredentialsInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { logIn?: Maybe<(
    { __typename?: 'User' }
    & RegUserFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logOut: (
    { __typename?: 'RemovedEntry' }
    & Pick<RemovedEntry, 'id'>
  ) }
);

export type UserFragment = (
  { __typename: 'User' }
  & Pick<User, 'id' | 'userName' | 'commercialFrom'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'User' }
    & UserFragment
  ) }
);

export const RegUserFragmentDoc = gql`
    fragment RegUser on User {
  __typename
  id
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  __typename
  id
  userName
  commercialFrom
}
    `;
export const CreateFieldDocument = gql`
    mutation CreateField($input: PlaceInput!) {
  upsertPlace(input: $input) {
    id
  }
}
    `;
export type CreateFieldMutationFn = Apollo.MutationFunction<CreateFieldMutation, CreateFieldMutationVariables>;

/**
 * __useCreateFieldMutation__
 *
 * To run a mutation, you first call `useCreateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFieldMutation, { data, loading, error }] = useCreateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFieldMutation(baseOptions?: Apollo.MutationHookOptions<CreateFieldMutation, CreateFieldMutationVariables>) {
        return Apollo.useMutation<CreateFieldMutation, CreateFieldMutationVariables>(CreateFieldDocument, baseOptions);
      }
export type CreateFieldMutationHookResult = ReturnType<typeof useCreateFieldMutation>;
export type CreateFieldMutationResult = Apollo.MutationResult<CreateFieldMutation>;
export type CreateFieldMutationOptions = Apollo.BaseMutationOptions<CreateFieldMutation, CreateFieldMutationVariables>;
export const FieldDocument = gql`
    query Field($id: ID!) {
  getPlace(id: $id) {
    id
    name
    description
    address
    roof
    price
    phone
    email
    size
  }
}
    `;

/**
 * __useFieldQuery__
 *
 * To run a query within a React component, call `useFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFieldQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFieldQuery(baseOptions: Apollo.QueryHookOptions<FieldQuery, FieldQueryVariables>) {
        return Apollo.useQuery<FieldQuery, FieldQueryVariables>(FieldDocument, baseOptions);
      }
export function useFieldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FieldQuery, FieldQueryVariables>) {
          return Apollo.useLazyQuery<FieldQuery, FieldQueryVariables>(FieldDocument, baseOptions);
        }
export type FieldQueryHookResult = ReturnType<typeof useFieldQuery>;
export type FieldLazyQueryHookResult = ReturnType<typeof useFieldLazyQuery>;
export type FieldQueryResult = Apollo.QueryResult<FieldQuery, FieldQueryVariables>;
export const FieldsDocument = gql`
    query Fields($filter: PlaceFilter!, $pagination: Pagination) {
  getPlaces(filter: $filter, pagination: $pagination) {
    rows {
      id
      name
      description
      address
      roof
      price
    }
  }
}
    `;

/**
 * __useFieldsQuery__
 *
 * To run a query within a React component, call `useFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFieldsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFieldsQuery(baseOptions: Apollo.QueryHookOptions<FieldsQuery, FieldsQueryVariables>) {
        return Apollo.useQuery<FieldsQuery, FieldsQueryVariables>(FieldsDocument, baseOptions);
      }
export function useFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FieldsQuery, FieldsQueryVariables>) {
          return Apollo.useLazyQuery<FieldsQuery, FieldsQueryVariables>(FieldsDocument, baseOptions);
        }
export type FieldsQueryHookResult = ReturnType<typeof useFieldsQuery>;
export type FieldsLazyQueryHookResult = ReturnType<typeof useFieldsLazyQuery>;
export type FieldsQueryResult = Apollo.QueryResult<FieldsQuery, FieldsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($credentials: ViewerCredentialsInput!) {
  logIn(credentials: $credentials) {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logOut {
    id
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  viewer {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;