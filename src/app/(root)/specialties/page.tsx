import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { specialties } from "@/lib/constants";

const SpecialtiesPage = () => {
  return (
    <>
      <PageHeader title="Our Specialties" bgImage="specialties" />

      <section className="space-y-8 text-center mb-16 py-16">
        <h3>
          Dynamic Billing Solutions Designed for a Variety of Medical
          Specialties
        </h3>

        <p className="max-w-[80%] mx-auto">
          <b>Mi MedCare LLC</b>, we bring proven expertise across a wide range
          of medical billing specialties. With years of hands-on experience, our
          team excels in delivering reliable, results driven billing solutions
          tailored to each practice. Trusted by healthcare providers across the
          U.S, we pride ourselves on offering high quality, efficient, and
          transparent services that help maximize reimbursements while reducing
          administrative burden. Our commitment to accuracy and compliance
          ensures every claim is processed with precision and care. Let Mi
          MedCare LLC streamline your billing operations so you can focus on
          providing exceptional patient care and growing your practice with
          confidence.
        </p>

        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-6 mt-16">
          {specialties.map((s) => (
            <li
              key={s.title}
              className="space-y-2 p-4 bg-white rounded-2xl text-center shadow-sm"
            >
              {<s.icon className="size-8 text-primary mx-auto" />}
              <h4 className="text-md font-medium">{s.title}</h4>
              <Button className="mt-2">Apply Now</Button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SpecialtiesPage;
