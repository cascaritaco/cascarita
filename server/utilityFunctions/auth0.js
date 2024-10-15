async function getUserInfoFromAuth0(token) {
  try {
    const response = await fetch(
      "https://dev-2vszya8j41e1n3fe.us.auth0.com/userinfo",
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
