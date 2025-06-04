import CheckCodeSection from "./CheckCodeSection";
import GenerationCodeSection from "./GenerationCodeSection";

const Main = () => {
  return (
    <div className="container lg:w-3/5 space-y-12">
      <GenerationCodeSection />
      <CheckCodeSection />

      <p className="w-3/4 text-center mx-auto mt-5">Have a gOod tImE.💜.</p>
    </div>
  );
};

export default Main;
