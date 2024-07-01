import { RegistrationForm } from "@/components/forms/registration-form";
import type { NextPage } from "next";

const RegistrationPage: NextPage = () => {
  return (
    <section>
      <div className="pt-8 pb-4 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
        <RegistrationForm />
      </div>
    </section>
  );
};

export default RegistrationPage;
