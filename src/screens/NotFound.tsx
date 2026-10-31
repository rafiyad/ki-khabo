import { ButtonLink } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Mascot } from "@/components/Mascot";
import { bn } from "@/content/bn";

export function NotFound() {
  return (
    <section className="py-8 text-center">
      <Mascot expression="surprised" className="mx-auto w-28" />
      <Heading title={bn.notFound.title} className="mt-3 text-xl">
        {bn.notFound.title}
      </Heading>
      <ButtonLink to="/" variant="primary" className="mt-5">
        {bn.notFound.home}
      </ButtonLink>
    </section>
  );
}
