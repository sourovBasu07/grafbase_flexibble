import { ProfilePage } from "@components";
import { getUserProjects } from "@lib/actions";
import React from "react";

const UserProfile = async ({ params }) => {
  const result = await getUserProjects(params.id, 100);

  if (!result?.user) {
    return <p className="no-result-text">Failed to fetch user info</p>;
  }
  return <ProfilePage user={result?.user} />;
};

export default UserProfile;
