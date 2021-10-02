import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProductTags: Scalars['Boolean'];
  changePassword: UserResponse;
  createProduct: ProductResponse;
  createReview: Review;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout?: Maybe<Scalars['Boolean']>;
  register: UserResponse;
};


export type MutationAddProductTagsArgs = {
  id: Scalars['Int'];
  tag: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateProductArgs = {
  options: ProductInput;
};


export type MutationCreateReviewArgs = {
  body: Scalars['String'];
  productId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type Notification = {
  __typename?: 'Notification';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  imgUrl: Scalars['String'];
  link: Scalars['String'];
  read: Scalars['Boolean'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  description: Scalars['String'];
  id: Scalars['Float'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  private: Scalars['Boolean'];
  productUrl: Scalars['String'];
  rating: Scalars['Float'];
  reviews: Array<Review>;
  suggestions: Array<Suggestion>;
  tagLine: Scalars['String'];
  tags: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type ProductInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  tagLine: Scalars['String'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  errors?: Maybe<Array<FieldError>>;
  product?: Maybe<Product>;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getProduct: Product;
  getUserProducts: Array<Product>;
  me?: Maybe<User>;
  topProduct: Product;
};


export type QueryGetProductArgs = {
  id: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  product: Product;
  productId: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Suggestion = {
  __typename?: 'Suggestion';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  feature: Scalars['String'];
  id: Scalars['Float'];
  product: Product;
  productId: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  bio: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  notifications: Array<Notification>;
  products: Array<Product>;
  reviews: Array<Review>;
  suggestions: Array<Suggestion>;
  theme: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularNotificationFragment = { __typename: 'Notification', id: number, imgUrl: string, body: string, read: boolean, link: string, userId: number, createdAt: string, updatedAt: string };

export type RegularProductFragment = { __typename: 'Product', id: number, name: string, imgUrl: string, description: string, tagLine: string, productUrl: string, rating: number, tags: Array<string>, creatorId: number, private: boolean, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string }, reviews: Array<{ __typename?: 'Review', id: number, title: string, body: string, creatorId: number, productId: number, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string } }> };

export type RegularProductResponseFragment = { __typename?: 'ProductResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, product?: Maybe<{ __typename?: 'Product', id: number, name: string }> };

export type RegularUserFragment = { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string }> };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string }> } };

export type CreateProductMutationVariables = Exact<{
  options: ProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, product?: Maybe<{ __typename?: 'Product', id: number, name: string }> } };

export type CreateReviewMutationVariables = Exact<{
  body: Scalars['String'];
  title: Scalars['String'];
  productId: Scalars['Int'];
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: number, title: string, body: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: Maybe<boolean> };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string }> } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct: { __typename: 'Product', id: number, name: string, imgUrl: string, description: string, tagLine: string, productUrl: string, rating: number, tags: Array<string>, creatorId: number, private: boolean, createdAt: string, updatedAt: string, suggestions: Array<{ __typename?: 'Suggestion', id: number, feature: string, creator: { __typename?: 'User', id: number, email: string, username: string } }>, creator: { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string }, reviews: Array<{ __typename?: 'Review', id: number, title: string, body: string, creatorId: number, productId: number, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string } }> } };

export type TopProductQueryVariables = Exact<{ [key: string]: never; }>;


export type TopProductQuery = { __typename?: 'Query', topProduct: { __typename: 'Product', id: number, name: string, imgUrl: string, description: string, tagLine: string, productUrl: string, rating: number, tags: Array<string>, creatorId: number, private: boolean, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string }, reviews: Array<{ __typename?: 'Review', id: number, title: string, body: string, creatorId: number, productId: number, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string } }> } };

export type GetUserProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProductsQuery = { __typename?: 'Query', getUserProducts: Array<{ __typename: 'Product', id: number, name: string, imgUrl: string, description: string, tagLine: string, productUrl: string, rating: number, tags: Array<string>, creatorId: number, private: boolean, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string }, reviews: Array<{ __typename?: 'Review', id: number, title: string, body: string, creatorId: number, productId: number, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string } }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename: 'User', id: number, name: string, theme: string, email: string, bio: string, username: string, createdAt: string, updatedAt: string, avatarUrl: string, notifications: Array<{ __typename: 'Notification', id: number, imgUrl: string, body: string, read: boolean, link: string, userId: number, createdAt: string, updatedAt: string }> }> };

export const RegularNotificationFragmentDoc = gql`
    fragment RegularNotification on Notification {
  id
  imgUrl
  body
  read
  link
  userId
  createdAt
  updatedAt
  __typename
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  name
  theme
  email
  bio
  username
  createdAt
  updatedAt
  avatarUrl
  __typename
}
    `;
export const RegularProductFragmentDoc = gql`
    fragment RegularProduct on Product {
  id
  name
  imgUrl
  description
  tagLine
  productUrl
  rating
  tags
  creatorId
  private
  creator {
    ...RegularUser
  }
  reviews {
    id
    title
    body
    creatorId
    productId
    creator {
      ...RegularUser
    }
    createdAt
    updatedAt
  }
  createdAt
  updatedAt
  __typename
}
    ${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularProductResponseFragmentDoc = gql`
    fragment RegularProductResponse on ProductResponse {
  errors {
    ...RegularError
  }
  product {
    id
    name
  }
}
    ${RegularErrorFragmentDoc}`;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation changePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($options: ProductInput!) {
  createProduct(options: $options) {
    ...RegularProductResponse
  }
}
    ${RegularProductResponseFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateReviewDocument = gql`
    mutation createReview($body: String!, $title: String!, $productId: Int!) {
  createReview(body: $body, title: $title, productId: $productId) {
    id
    title
    body
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      body: // value for 'body'
 *      title: // value for 'title'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
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
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetProductDocument = gql`
    query getProduct($id: Int!) {
  getProduct(id: $id) {
    ...RegularProduct
    suggestions {
      id
      feature
      creator {
        id
        email
        username
      }
    }
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const TopProductDocument = gql`
    query topProduct {
  topProduct {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useTopProductQuery__
 *
 * To run a query within a React component, call `useTopProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopProductQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopProductQuery(baseOptions?: Apollo.QueryHookOptions<TopProductQuery, TopProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopProductQuery, TopProductQueryVariables>(TopProductDocument, options);
      }
export function useTopProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopProductQuery, TopProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopProductQuery, TopProductQueryVariables>(TopProductDocument, options);
        }
export type TopProductQueryHookResult = ReturnType<typeof useTopProductQuery>;
export type TopProductLazyQueryHookResult = ReturnType<typeof useTopProductLazyQuery>;
export type TopProductQueryResult = Apollo.QueryResult<TopProductQuery, TopProductQueryVariables>;
export const GetUserProductsDocument = gql`
    query getUserProducts {
  getUserProducts {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useGetUserProductsQuery__
 *
 * To run a query within a React component, call `useGetUserProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProductsQuery, GetUserProductsQueryVariables>(GetUserProductsDocument, options);
      }
export function useGetUserProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProductsQuery, GetUserProductsQueryVariables>(GetUserProductsDocument, options);
        }
export type GetUserProductsQueryHookResult = ReturnType<typeof useGetUserProductsQuery>;
export type GetUserProductsLazyQueryHookResult = ReturnType<typeof useGetUserProductsLazyQuery>;
export type GetUserProductsQueryResult = Apollo.QueryResult<GetUserProductsQuery, GetUserProductsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
    notifications {
      ...RegularNotification
    }
  }
}
    ${RegularUserFragmentDoc}
${RegularNotificationFragmentDoc}`;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;