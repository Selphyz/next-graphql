import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  currentUser?: Maybe<User>;
  stream?: Maybe<Stream>;
  streams: Array<Stream>;
};


export type QueryUserArgs = {
  userId: Scalars['ObjectId'];
};


export type QueryStreamArgs = {
  streamId: Scalars['ObjectId'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  email: Scalars['String'];
};


export type Stream = {
  __typename?: 'Stream';
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  author: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addStream: Stream;
  editStream: Stream;
  deleteStream: Stream;
};


export type MutationRegisterArgs = {
  input: AuthInput;
};


export type MutationLoginArgs = {
  input: AuthInput;
};


export type MutationAddStreamArgs = {
  input: StreamInput;
};


export type MutationEditStreamArgs = {
  input: StreamInput;
};


export type MutationDeleteStreamArgs = {
  streamId: Scalars['ObjectId'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type StreamInput = {
  id?: Maybe<Scalars['ObjectId']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type AddStreamMutationVariables = Exact<{
  input: StreamInput;
}>;


export type AddStreamMutation = (
  { __typename?: 'Mutation' }
  & { addStream: (
    { __typename?: 'Stream' }
    & Pick<Stream, '_id' | 'title' | 'description' | 'url'>
  ) }
);

export type EditStreamMutationVariables = Exact<{
  input: StreamInput;
}>;


export type EditStreamMutation = (
  { __typename?: 'Mutation' }
  & { addStream: (
    { __typename?: 'Stream' }
    & Pick<Stream, '_id' | 'title' | 'description' | 'url'>
  ) }
);

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email'>
    )> }
  ) }
);

export type SingUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SingUpMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email'>
    )> }
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email'>
  )> }
);

export type StreamQueryVariables = Exact<{
  streamId: Scalars['ObjectId'];
}>;


export type StreamQuery = (
  { __typename?: 'Query' }
  & { stream?: Maybe<(
    { __typename?: 'Stream' }
    & Pick<Stream, '_id' | 'title' | 'description' | 'url'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email'>
    ) }
  )> }
);

export type StreamsQueryVariables = Exact<{ [key: string]: never; }>;


export type StreamsQuery = (
  { __typename?: 'Query' }
  & { streams: Array<(
    { __typename?: 'Stream' }
    & Pick<Stream, '_id' | 'title' | 'description' | 'url'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email'>
    ) }
  )> }
);


export const AddStreamDocument = gql`
    mutation AddStream($input: StreamInput!) {
  addStream(input: $input) {
    _id
    title
    description
    url
  }
}
    `;
export type AddStreamMutationFn = Apollo.MutationFunction<AddStreamMutation, AddStreamMutationVariables>;

/**
 * __useAddStreamMutation__
 *
 * To run a mutation, you first call `useAddStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStreamMutation, { data, loading, error }] = useAddStreamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddStreamMutation(baseOptions?: Apollo.MutationHookOptions<AddStreamMutation, AddStreamMutationVariables>) {
        return Apollo.useMutation<AddStreamMutation, AddStreamMutationVariables>(AddStreamDocument, baseOptions);
      }
export type AddStreamMutationHookResult = ReturnType<typeof useAddStreamMutation>;
export type AddStreamMutationResult = Apollo.MutationResult<AddStreamMutation>;
export type AddStreamMutationOptions = Apollo.BaseMutationOptions<AddStreamMutation, AddStreamMutationVariables>;
export const EditStreamDocument = gql`
    mutation EditStream($input: StreamInput!) {
  addStream(input: $input) {
    _id
    title
    description
    url
  }
}
    `;
export type EditStreamMutationFn = Apollo.MutationFunction<EditStreamMutation, EditStreamMutationVariables>;

/**
 * __useEditStreamMutation__
 *
 * To run a mutation, you first call `useEditStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editStreamMutation, { data, loading, error }] = useEditStreamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditStreamMutation(baseOptions?: Apollo.MutationHookOptions<EditStreamMutation, EditStreamMutationVariables>) {
        return Apollo.useMutation<EditStreamMutation, EditStreamMutationVariables>(EditStreamDocument, baseOptions);
      }
export type EditStreamMutationHookResult = ReturnType<typeof useEditStreamMutation>;
export type EditStreamMutationResult = Apollo.MutationResult<EditStreamMutation>;
export type EditStreamMutationOptions = Apollo.BaseMutationOptions<EditStreamMutation, EditStreamMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    user {
      _id
      email
    }
    token
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SingUpDocument = gql`
    mutation SingUp($email: String!, $password: String!) {
  register(input: {email: $email, password: $password}) {
    user {
      _id
      email
    }
    token
  }
}
    `;
export type SingUpMutationFn = Apollo.MutationFunction<SingUpMutation, SingUpMutationVariables>;

/**
 * __useSingUpMutation__
 *
 * To run a mutation, you first call `useSingUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singUpMutation, { data, loading, error }] = useSingUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSingUpMutation(baseOptions?: Apollo.MutationHookOptions<SingUpMutation, SingUpMutationVariables>) {
        return Apollo.useMutation<SingUpMutation, SingUpMutationVariables>(SingUpDocument, baseOptions);
      }
export type SingUpMutationHookResult = ReturnType<typeof useSingUpMutation>;
export type SingUpMutationResult = Apollo.MutationResult<SingUpMutation>;
export type SingUpMutationOptions = Apollo.BaseMutationOptions<SingUpMutation, SingUpMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    _id
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const StreamDocument = gql`
    query Stream($streamId: ObjectId!) {
  stream(streamId: $streamId) {
    _id
    title
    description
    url
    author {
      _id
      email
    }
  }
}
    `;

/**
 * __useStreamQuery__
 *
 * To run a query within a React component, call `useStreamQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamQuery({
 *   variables: {
 *      streamId: // value for 'streamId'
 *   },
 * });
 */
export function useStreamQuery(baseOptions: Apollo.QueryHookOptions<StreamQuery, StreamQueryVariables>) {
        return Apollo.useQuery<StreamQuery, StreamQueryVariables>(StreamDocument, baseOptions);
      }
export function useStreamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamQuery, StreamQueryVariables>) {
          return Apollo.useLazyQuery<StreamQuery, StreamQueryVariables>(StreamDocument, baseOptions);
        }
export type StreamQueryHookResult = ReturnType<typeof useStreamQuery>;
export type StreamLazyQueryHookResult = ReturnType<typeof useStreamLazyQuery>;
export type StreamQueryResult = Apollo.QueryResult<StreamQuery, StreamQueryVariables>;
export const StreamsDocument = gql`
    query Streams {
  streams {
    _id
    title
    description
    url
    author {
      _id
      email
    }
  }
}
    `;

/**
 * __useStreamsQuery__
 *
 * To run a query within a React component, call `useStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStreamsQuery(baseOptions?: Apollo.QueryHookOptions<StreamsQuery, StreamsQueryVariables>) {
        return Apollo.useQuery<StreamsQuery, StreamsQueryVariables>(StreamsDocument, baseOptions);
      }
export function useStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamsQuery, StreamsQueryVariables>) {
          return Apollo.useLazyQuery<StreamsQuery, StreamsQueryVariables>(StreamsDocument, baseOptions);
        }
export type StreamsQueryHookResult = ReturnType<typeof useStreamsQuery>;
export type StreamsLazyQueryHookResult = ReturnType<typeof useStreamsLazyQuery>;
export type StreamsQueryResult = Apollo.QueryResult<StreamsQuery, StreamsQueryVariables>;