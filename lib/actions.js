import { categoryFilters } from "@constants";
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  updateProjectMutation,
} from "@graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphqlRequest = async (query, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphqlRequest(getUserQuery, { email });
};

export const createUser = (name, email, avatarUrl) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGraphqlRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createNewProject = async (form, creatorId, token) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphqlRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = async (category = null, endCursor) => {
  client.setHeader("x-api-key", apiKey);

  const categories = category === null ? categoryFilters : [category];

  return makeGraphqlRequest(projectsQuery, { categories, endCursor });
};

export const getProjectDetails = (id) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphqlRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id, last) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphqlRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = (id, token) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphqlRequest(deleteProjectMutation, { id });
};

export const updateProject = async (form, projectId, token) => {
  function isBase64DataUrl(value) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataUrl(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm,
  };

  return makeGraphqlRequest(updateProjectMutation, variables);
};
