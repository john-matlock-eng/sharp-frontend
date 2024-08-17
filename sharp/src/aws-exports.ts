const awsExports = {
  aws_project_region: process.env.REACT_APP_AWS_REGION,
  aws_cognito_region: process.env.REACT_APP_AWS_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
  oauth: {
    domain: process.env.REACT_APP_COGNITO_DOMAIN,
    scope: ['email', 'openid', 'profile'],
    redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
    redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
    responseType: 'code',
  },
  API: {
    endpoints: [
      {
        name: "CommunityAPI",
        endpoint: process.env.REACT_APP_COMMUNITY_API_ENDPOINT,
        region: process.env.REACT_APP_AWS_REGION,
      },
    ],
  },
};

export default awsExports;