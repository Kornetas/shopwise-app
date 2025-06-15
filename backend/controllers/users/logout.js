// Handles user logout by clearing the JWT cookie

module.exports = (req, res) => {
  // Clear the 'token' cookie on the same path as login
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // Log the logout action
  console.log("User logged out");

  res.json({ message: "Logged out successfully." });
};
