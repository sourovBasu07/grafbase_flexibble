import { Modal, ProjectForm } from "@components";
import { getProjectDetails } from "@lib/actions";
import { getCurrentUser } from "@lib/session";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = await getProjectDetails(id);

  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>

      <ProjectForm type="edit" session={session} project={result?.project} />
    </Modal>
  );
};

export default EditProject;
