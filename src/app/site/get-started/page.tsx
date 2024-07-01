import type { NextPage } from "next";
import { CreateWorkspaceForm } from "@/components/forms/create-workspace-form";

const RegistrationPage: NextPage = () => {
  return (
    <section>
      <div className="pt-8 pb-4 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
        <CreateWorkspaceForm />
      </div>
    </section>
  );
};

export default RegistrationPage;
