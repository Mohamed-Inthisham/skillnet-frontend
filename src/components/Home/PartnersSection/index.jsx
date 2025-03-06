const PartnersSection = () => (
  <section className="py-10 px-20 text-center">
    <h2 className="text-lg font-semibold">Join Great Learning graduates at top-tier companies</h2>
    <div className="flex justify-center mt-6 space-x-6">
      {["Wiley", "Virtusa", "IFS", "WSO2", "Sysco Labs"].map((partner, index) => (
        <img key={index} src={`/${partner.toLowerCase()}.webp`} alt={partner} className="h-12" />
      ))}
    </div>
  </section>
);

export default PartnersSection;