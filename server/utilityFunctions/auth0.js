async function getUserInfoFromAuth0(token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_AUTH0_PROVIDER}/userinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
    );

    return response.json();
  } catch (error) {
    console.error("failed to retrieve user info from auth0:", error);
    throw new Error(`failed to retrieve user info from auth0: ${error}`);
  }
}

module.exports = getUserInfoFromAuth0;
