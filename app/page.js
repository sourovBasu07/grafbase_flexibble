import { Categories, LoadMore, ProjectCard } from "@components";
import { fetchAllProjects } from "@lib/actions";

export const dynamic = "force-dynamic";

export const dynamicParams = true;

export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }) => {
  const data = await fetchAllProjects(category, endcursor);

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No Projects found, create some first
        </p>
      </section>
    );
  }

  const pagination = data?.projectSearch?.pageInfo;

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>

      <LoadMore
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasPreviousPage={pagination?.hasPreviousPage}
        hasNextPage={pagination?.hasNextPage}
      />
    </section>
  );
};

export default Home;
