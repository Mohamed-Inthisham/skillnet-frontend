const StatsSection = () => (
  <section className="py-10 text-center">
    <h2 className="text-lg font-semibold">Invest in yourself today. Unlock success for a lifetime.</h2>
    <div className="flex justify-center mt-4 space-x-10">
      {['1000+ STUDENTS ENROLLED', '50+ PARTNER COMPANIES', '96% SATISFACTION RATE', '91% COMPLETION RATE'].map((stat, index) => (
        <div key={index} className="text-lg font-bold text-blue-500">{stat}</div>
      ))}
    </div>
  </section>
);

export default StatsSection;